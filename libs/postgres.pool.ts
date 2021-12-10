import pg from 'pg'
const config = require('./../config/config')

const USER = encodeURIComponent(config.config.dbUser);
const PASSWORD = encodeURIComponent(config.config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.config.dbHost}:${config.config.dbPort}/${config.config.dbName}`
const pool = new pg.Pool({ connectionString: URI });
module.exports = pool;