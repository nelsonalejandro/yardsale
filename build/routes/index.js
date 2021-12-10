"use strict";
const productRouter = require('./product.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const orderRouter = require('./order.router');
const customersRouter = require('./customer.router');
function routerApi(app) {
    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.use('/category', categoryRouter);
    app.use('/order', orderRouter);
    app.use('/customer', customersRouter);
}
module.exports = routerApi;
