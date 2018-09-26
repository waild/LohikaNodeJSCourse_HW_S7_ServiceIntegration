// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'order',
      host: process.env.DB_HOST || '127.0.0.1',
    },
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'order-test',
      host: process.env.DB_HOST || '127.0.0.1',
    },
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
