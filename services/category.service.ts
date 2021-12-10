import boom from '@hapi/boom';
const { models } = require('./../libs/sequelize');
class CategoryService {

  constructor() {
  }
  async create(data: any) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async findOne(id: any) {
    const Category = await models.Category.findByPk(id);
    if (!Category) {
      throw boom.notFound('Category not found');
    }
    return Category;
  }

  async update(id: any, changes: any) {
    const Category = await this.findOne(id);
    const rta = await Category.update(changes);
    return rta;
  }

  async delete(id: any) {
    const Category = await this.findOne(id);
    await Category.destroy();
    return "ok";
  }
}

module.exports = CategoryService;