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
const { models } = require('./../libs/sequelize');
class OrderService {
    constructor() {
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield models.Order.findAll({
                where: {
                    '$customer.user.id$': userId
                },
                include: [
                    {
                        association: 'customer',
                        include: ['user']
                    }
                ]
            });
            return orders;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = yield models.Order.create(data);
            return newOrder;
        });
    }
    addItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findProductStock = yield models.Product.findByPk(data.productId);
            if (findProductStock == null) {
                throw boom_1.default.notFound('product not found');
            }
            else {
                if (findProductStock.stock < data.cuantity) {
                    throw boom_1.default.badRequest(`no stock, max cuantity for this product is ${findProductStock.stock}`);
                }
            }
            const findOrder = yield models.OrderProduct.findOne({ where: { 'order_id': data.orderId, 'product_id': data.productId } });
            if (findOrder == null) {
                const newItem = yield models.OrderProduct.create(data);
                return newItem;
            }
            else {
                const rta = yield findOrder.update(data);
                return rta;
            }
        });
    }
    changeOrder(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data != 'pending' && data != 'sold') {
                throw boom_1.default.badRequest('state of order is pending or sold');
            }
            const findOrder = yield models.Order.findByPk(id);
            if (findOrder == null) {
                throw boom_1.default.notFound(`order id: ${id} not found`);
            }
            else {
                const rta = yield findOrder.update({ "state": data });
                return rta;
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield models.Order.findByPk(id, {
                include: [
                    {
                        association: 'customer',
                        include: ['user']
                    },
                    'items'
                ]
            });
            return order;
        });
    }
}
module.exports = OrderService;
