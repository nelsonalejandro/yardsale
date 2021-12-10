import express from 'express';
const router = express.Router();

const ProductService = require('./../services/product.service');
const service = new ProductService();

const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/product.schema')
const validatorHandler = require('./../middlewares/validator.handler');



router.get('/', validatorHandler(queryProductSchema,'query'), async (req: any, res: any, next: any) => {
  try {
    const products = await service.find(req.query);
    res.json(products);
  } catch (error) {
    next(error)
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'), async (req: any, res: any, next: any) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validatorHandler(updateProductSchema, 'body'), async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
