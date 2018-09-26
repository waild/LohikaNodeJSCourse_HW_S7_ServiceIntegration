const Ajv = require('ajv');
const orderRepo = require('../repositories/orderRepo');
const NotFoundError = require('../infrastracture/customErrors/notFoundError');

const ajv = new Ajv();

const { orderSchema } = require('../validations/validationSchemas');

const isorderValid = order => ajv.validate(orderSchema, order);

class OrderService {
  static create(orderRequest) {
    if (!isorderValid(orderRequest)) {
      return Promise.reject(new Error('Data is not valid'));
    }
    return orderRepo.create(orderRequest.meals);
  }

  static async get(id) {
    const meals = await orderRepo.get(id);
    if (meals.length > 0) {
      return {
        meals: meals.map(meal => meal.name),
      };
    }
    return Promise.reject(new NotFoundError('Order was not found'));
  }
}

module.exports = OrderService;
