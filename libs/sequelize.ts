import { Sequelize } from 'sequelize';

const configuration = require('./../config/config');
const Models = require('./../db/models')

const USER = encodeURIComponent(configuration.config.dbUser);
const PASSWORD = encodeURIComponent(configuration.config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${configuration.config.dbHost}:${configuration.config.dbPort}/${configuration.config.dbName}`;


const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

Models(sequelize);

module.exports = sequelize;