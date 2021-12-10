import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const stock = Joi.number().integer()

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  stock: stock
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit /* : limit.when('offset', {
    is: Joi.exist(),
    then: Joi.required()
  }) */,
  offset: offset.when('limit', {
    is: Joi.exist(),
    then: Joi.required()
  }),
  price,
  price_min/* : price_min.when('price_max', {
    is: Joi.exist(),
    then: Joi.required()
  }) */,
  price_max: price_max.when('price_min', {
    is: Joi.exist(),
    then: Joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }