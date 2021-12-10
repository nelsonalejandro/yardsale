const express = require('express');

const CustomerService = require('../services/customers.service');
const validationHandler = require('../middlewares/validator.handler');
const customerSchema= require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req:any, res:any, next:any) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});
router.get('/:id', validationHandler(customerSchema.getCustomerSchema, 'params'), async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(customerSchema.createCustomerSchema, 'body'),
  async (req: any, res: any, next: any) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validationHandler(customerSchema.getCustomerSchema, 'params'),
  validationHandler(customerSchema.updateCustomerSchema, 'body'),
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(customerSchema.getCustomerSchema, 'params'),
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;