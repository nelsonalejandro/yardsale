"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const config = require('./../config/config');
const USER = encodeURIComponent(config.config.dbUser);
const PASSWORD = encodeURIComponent(config.config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.config.dbHost}:${config.config.dbPort}/${config.config.dbName}`;
const pool = new pg_1.default.Pool({ connectionString: URI });
module.exports = pool;
