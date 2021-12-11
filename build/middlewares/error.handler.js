"use strict";
const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');
function logErrors(err, req, res, next) {
    //console.log(err)
    next(err);
}
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    else {
        next(err);
    }
}
function ormErrorHandler(err, req, res, next) {
    if (err.name == "SequelizeDatabaseError") {
        res.status(409).json({
            message: err.name,
            error: err.parent.detail
        });
    }
    else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        error: err.stack
    });
}
module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
