import boom from '@hapi/boom';

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() { }

  async create(data:any) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id: any) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id: any, changes: any) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id: any) {
    const user = await this.findOne(id);
    await user.destroy();
    return "ok";
  }
}

module.exports = UserService;