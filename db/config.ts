const configuration = require('./../config/config');

const USER = encodeURIComponent(configuration.config.dbUser);
const PASSWORD = encodeURIComponent(configuration.config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${configuration.config.dbHost}:${configuration.config.dbPort}/${configuration.config.dbName}`;


module.exports= {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
}