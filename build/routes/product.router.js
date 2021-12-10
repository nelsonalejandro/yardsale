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
const router = express_1.default.Router();
const ProductService = require('./../services/product.service');
const service = new ProductService();
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/product.schema');
const validatorHandler = require('./../middlewares/validator.handler');
router.get('/', validatorHandler(queryProductSchema, 'query'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield service.find(req.query);
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', validatorHandler(createProductSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newProduct = yield service.create(body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.findOne(id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/:id', validatorHandler(updateProductSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = yield service.update(id, body);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rta = yield service.delete(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
