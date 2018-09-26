const knex = require('../../db');

class OrderRepo {
  static get(id) {
    return knex('order')
      .join('meal', 'meal.order_id', 'order.id')
      .where('order.id', id)
      .select('meal.name');
  }

  static create(meals) {
    return knex.transaction(trx => trx.insert({}).returning('id').into('order')
      .then(async (ids) => {
        const orderId = ids[0];
        await Promise.all(meals.map(meal => trx.insert({ order_id: orderId, name: meal }).into('meal')));
        return orderId;
      }));
  }
}
module.exports = OrderRepo;
