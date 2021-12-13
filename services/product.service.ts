import boom from '@hapi/boom';
/* import { query } from 'express'; */
import { Op } from 'sequelize'
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor() {
    }

  async create(data: any) {
    const product = await models.Product.create(data);
    return product;
  }

  async find(query:any) {


    const options:{[key:string]:any} = {
      include: ['category'],
       where: {
      }
    }

    if(query.limit && query.offset){
      options.limit = query.limit;
      options.offset = query.offset;
    }

    if(query.price){
      options.where.price = query.price;
    }

    if (query.price_min&&query.price_max) {
      options.where.price = {
        [Op.gte]: query.price_min,
        [Op.lte]: query.price_max
      };
    }
    const rta = await models.Product.findAll(options);
    return rta;
  }

  async findOne(id: any) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('user not found');
    }
    return product;
  }

  async update(id: any, changes: any) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id: any) {
    const product = await this.findOne(id);
    await product.destroy();
    return "ok";
  }
}

module.exports = ProductsService;