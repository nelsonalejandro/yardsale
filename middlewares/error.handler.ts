const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom')

function logErrors(err: any, req: any, res: any, next: any) {
  next(err);
}

function boomErrorHandler(err: any, req: any, res: any, next: any) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

function ormErrorHandler(err: any, req: any, res: any, next: any) {
  if (err.name == "SequelizeDatabaseError") {
    res.status(409).json({
      message: err.name,
      error: err.parent.detail
    })
  } else {
    next(err)
  }
}

function errorHandler(err: any, req: any, res: any, next: any) {
  res.status(500).json({
    message: err.message,
    error: err.stack
  })
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
