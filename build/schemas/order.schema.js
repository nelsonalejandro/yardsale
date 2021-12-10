"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().integer();
const customerId = joi_1.default.number().integer();
const orderId = joi_1.default.number().integer();
const productId = joi_1.default.number().integer();
const cuantity = joi_1.default.number().integer().min(1);
const state = joi_1.default.string();
const getOrderSchema = joi_1.default.object({
    id: id.required(),
});
const createOrderSchema = joi_1.default.object({
    customerId: customerId.required(),
});
const changeOrderSchema = joi_1.default.object({
    state: state.required()
});
const addItemSchema = joi_1.default.object({
    orderId: orderId.required(),
    productId: productId.required(),
    cuantity: cuantity.required()
});
module.exports = { getOrderSchema, createOrderSchema, addItemSchema, changeOrderSchema };
