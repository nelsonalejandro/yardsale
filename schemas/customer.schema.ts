const Joi = require('joi');

const id = Joi.number().integer();
const namecustomer = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: namecustomer.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  //userId: userId.required()
  user: Joi.object({
    email: email.required(),
    password: password.required()
  }).required()
});

const updateCustomerSchema = Joi.object({
  name: namecustomer,
  lastName,
  phone,
  userId
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };