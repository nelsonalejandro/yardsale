const productsRouter = require('./product.router')
//const userRouter = require('./user.router')

function routerApi(app) {
  const router= express.Router();
  app.use('/api/v1',router)
  router.use('/products', productsRouter)
  //app.use('/user', userRouter)
  //  app.use('/categories', productsRouter);
}

module.exports = routerApi;
