"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const CustomerService = require('../services/customers.service');
const validationHandler = require('../middlewares/validator.handler');
const customerSchema = require('../schemas/customer.schema');
const router = express.Router();
const service = new CustomerService();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield service.find());
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', validationHandler(customerSchema.getCustomerSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const customer = yield service.findOne(id);
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', validationHandler(customerSchema.createCustomerSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        res.status(201).json(yield service.create(body));
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/:id', validationHandler(customerSchema.getCustomerSchema, 'params'), validationHandler(customerSchema.updateCustomerSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        res.status(201).json(yield service.update(id, body));
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', validationHandler(customerSchema.getCustomerSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        res.status(200).json(yield service.delete(id));
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
