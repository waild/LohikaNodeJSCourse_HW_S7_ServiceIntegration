
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('order', (table) => {
      table.increments('id').primary();
    }),
    knex.schema.createTable('meal', (table) => {
      table.increments('id').primary();
      table.integer('order_id').notNull();
      table.string('name').notNull();
      table.foreign('order_id').references('order.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('meal', (table) => {
      table.dropForeign('order_id');
    }),
    knex.schema.dropTable('meal'),
    knex.schema.dropTable('order'),
  ]);
};
