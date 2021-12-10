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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { addItemSchema, createOrderSchema, getOrderSchema, changeOrderSchema } = require('./../schemas/order.schema');
const router = express_1.default.Router();
const service = new OrderService();
router.get('/:id', validatorHandler(getOrderSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield service.findOne(id);
        res.json(order);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', validatorHandler(createOrderSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newOrder = yield service.create(body);
        res.status(201).json(newOrder);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/add-item', validatorHandler(addItemSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newItem = yield service.addItem(body);
        res.status(201).json(newItem);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/change-order/:id', validatorHandler(getOrderSchema, 'params'), validatorHandler(changeOrderSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const changeOrder = yield service.changeOrder(req.params.id, req.body.state);
        res.status(201).json(changeOrder);
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
