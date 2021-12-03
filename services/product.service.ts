import faker from 'faker';
import boom from '@hapi/boom';

class ProductsService {
  products: any;

  constructor() {
    this.products = [];
    this.generate();
  }


  async generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data: any) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async get() {
    return this.products;
  }

  async findOne(id: any) {
    const product = this.products.find((item: { id: any; }) => item.id === id)
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id: any, changes: any) {
    const index = this.products.findIndex((item: { id: any; }) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id: any) {
    const index = this.products.findIndex((item: { id: any; }) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
