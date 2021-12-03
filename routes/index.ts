const productRouter = require('./product.router')

function routerApi(app: any) {
  app.use('/product', productRouter)
}

module.exports = routerApi;
