exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex.transaction(trx => trx.insert({}).returning('id').into('order')
    .then(async (ids) => {
      const orderId = ids[0];
      const meals = ['soup', 'french fries'];
      await Promise.all(meals.map(meal => trx.insert({ order_id: orderId, name: meal }).into('meal')));
      return orderId;
    }));
};
