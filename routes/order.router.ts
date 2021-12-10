import express from 'express';

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { addItemSchema, createOrderSchema, getOrderSchema, changeOrderSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();


router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req: any, res: any, next: any) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req: any, res: any, next: any) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-order/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(changeOrderSchema, 'body'),
  async (req: any, res: any, next: any) => {
    try {
      const changeOrder = await service.changeOrder(req.params.id,req.body.state);
      res.status(201).json(changeOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
