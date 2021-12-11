const productRouter = require('./product.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const orderRouter = require('./order.router');
const customersRouter = require('./customer.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app: any) {
  app.use('/product', productRouter);
  app.use('/user', userRouter);
  app.use('/category', categoryRouter);
  app.use('/order', orderRouter);
  app.use('/customer', customersRouter);
  app.use('/auth', authRouter);
  app.use('/profile', profileRouter);
}

module.exports = routerApi;
