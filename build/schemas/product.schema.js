"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().integer();
const name = joi_1.default.string().min(3).max(15);
const price = joi_1.default.number().integer().min(10);
const description = joi_1.default.string().min(10);
const image = joi_1.default.string().uri();
const categoryId = joi_1.default.number().integer();
const stock = joi_1.default.number().integer();
const price_min = joi_1.default.number().integer();
const price_max = joi_1.default.number().integer();
const limit = joi_1.default.number().integer();
const offset = joi_1.default.number().integer();
const createProductSchema = joi_1.default.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
    categoryId: categoryId.required(),
    stock: stock
});
const updateProductSchema = joi_1.default.object({
    name: name,
    price: price,
    image: image,
    description: description,
    categoryId
});
const getProductSchema = joi_1.default.object({
    id: id.required(),
});
const queryProductSchema = joi_1.default.object({
    limit /* : limit.when('offset', {
      is: Joi.exist(),
      then: Joi.required()
    }) */,
    offset: offset.when('limit', {
        is: joi_1.default.exist(),
        then: joi_1.default.required()
    }),
    price,
    price_min /* : price_min.when('price_max', {
      is: Joi.exist(),
      then: Joi.required()
    }) */,
    price_max: price_max.when('price_min', {
        is: joi_1.default.exist(),
        then: joi_1.default.required()
    })
});
module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
