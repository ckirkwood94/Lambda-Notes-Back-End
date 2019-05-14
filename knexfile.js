// Update with your config settings.
require('dotenv').config();
const localPg = {
  host: 'localhost',
  database: 'lambda',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};
const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    debug: true,
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
