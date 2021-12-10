import Joi from 'joi';

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId= Joi.number().integer();
const cuantity= Joi.number().integer().min(1);
const state = Joi.string();

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});
const changeOrderSchema = Joi.object({
  state: state.required()
});
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  cuantity: cuantity.required()
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema, changeOrderSchema};