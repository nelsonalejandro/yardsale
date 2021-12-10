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
const { models } = require('../libs/sequelize');
class CustomerService {
    constructor() { }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.Customer.findAll({
                include: ['user']
            });
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models.Customer.findByPk(id);
            if (!user) {
                throw boom_1.default.notFound('customer not found');
            }
            return user;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = yield models.Customer.create(data, {
                include: ['user']
            });
            return newCustomer;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield this.findOne(id);
            const rta = yield model.update(changes);
            return { message: "ok" };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield this.findOne(id);
            yield model.destroy();
            return { message: "ok" };
        });
    }
}
module.exports = CustomerService;
