const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const {Order,OrderSchema}=require('./order.model');
const  ProductModel  = require('./product.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model')


function setupModels(sequelize:any) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  ProductModel.Product.init(ProductModel.ProductSchema, ProductModel.Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  ProductModel.Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;