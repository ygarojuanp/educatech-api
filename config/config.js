require('dotenv').config();

const common = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'educatech_manha',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  logging: false
};

module.exports = {
  development: {
    ...common,
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || 'database.sqlite'
  },
  test: {
    ...common,
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    ...common,
    dialect: process.env.DB_DIALECT || 'mysql',
    storage: process.env.DB_STORAGE
  }
};
