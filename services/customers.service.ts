import boom from '@hapi/boom';
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() { }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id:any) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data:any) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id:any, changes:any) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return {message:"ok"};
  }

  async delete(id:any) {
    const model = await this.findOne(id);
    await model.destroy();
    return {message:"ok"};
  }

}

module.exports = CustomerService;