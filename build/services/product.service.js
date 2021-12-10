"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const sequelize_1 = require("sequelize");
const { models } = require('../libs/sequelize');
class ProductsService {
    constructor() {
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield models.Product.create(data);
            return product;
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                include: ['category'],
                where: {}
            };
            if (query.limit && query.offset) {
                options.limit = query.limit;
                options.offset = query.offset;
            }
            if (query.price) {
                options.where.price = query.price;
            }
            if (query.price_min && query.price_max) {
                options.where.price = {
                    [sequelize_1.Op.gte]: query.price_min,
                    [sequelize_1.Op.lte]: query.price_max
                };
            }
            const rta = yield models.Product.findAll(options);
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield models.Product.findByPk(id);
            if (!product) {
                throw boom_1.default.notFound('user not found');
            }
            return product;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.findOne(id);
            const rta = yield product.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.findOne(id);
            yield product.destroy();
            return "ok";
        });
    }
}
module.exports = ProductsService;
