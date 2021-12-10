'use strict';
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/category.model');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');
const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('./../models/order-product.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE, UserSchema);
    await queryInterface.dropTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.dropTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.dropTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.dropTable(ORDER_TABLE, OrderSchema);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

  }
};