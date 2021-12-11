import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

const { Strategy } = require('passport-local');

const UserService = require('./../../../services/user.service')
const serviceUser = new UserService();
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email:any, password:any, done:any) => {
    try {
      const user = await serviceUser.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;