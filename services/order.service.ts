import boom from '@hapi/boom';

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor() {
  }

  async create(data: any) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data: any) {
    const findProductStock = await models.Product.findByPk(data.productId);
    if (findProductStock == null) {
      throw boom.notFound('product not found');
    } else {
      if(findProductStock.stock<data.cuantity){

        throw boom.badRequest(`no stock, max cuantity for this product is ${findProductStock.stock}`);
      }
    }
    const findOrder = await models.OrderProduct.findOne({ where: { 'order_id': data.orderId, 'product_id': data.productId } });
    if (findOrder == null) {
      const newItem = await models.OrderProduct.create(data);
      return newItem;
    } else {
      const rta = await findOrder.update(data);
      return rta;
    }
  }
  async changeOrder(id: any, data: any) {
    if (data != 'pending' && data != 'sold') {
      throw boom.badRequest('state of order is pending or sold');
    }
    const findOrder = await models.Order.findByPk(id);
    if (findOrder == null) {
      throw boom.notFound(`order id: ${id} not found`);
    } else {
      const rta = await findOrder.update({"state":data});
      return rta;
    }
  }

  async findOne(id: any) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }
}

module.exports = OrderService;