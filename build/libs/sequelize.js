"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configuration = require('./../config/config');
const Models = require('./../db/models');
const USER = encodeURIComponent(configuration.config.dbUser);
const PASSWORD = encodeURIComponent(configuration.config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${configuration.config.dbHost}:${configuration.config.dbPort}/${configuration.config.dbName}`;
const sequelize = new sequelize_1.Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});
Models(sequelize);
module.exports = sequelize;
