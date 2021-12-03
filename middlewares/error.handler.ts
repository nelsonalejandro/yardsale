function logErrors(err: any, req: any, res: any, next: any) {
  next(err);
}

function boomErrorHandler(err: any, req: any, res: any, next: any) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }else{
    next(err)
  }
}

function errorHandler(err: any, req: any, res: any, next: any) {
   res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
