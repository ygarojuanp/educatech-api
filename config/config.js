require('dotenv').config();

const useSSL =
  process.env.DB_SSL === 'true' ||
  process.env.DB_SSL === '1' ||
  (process.env.DB_HOST && process.env.DB_HOST.includes('tidbcloud'));

const common = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'educatech_manha',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  logging: false
};

const mysqlDialectOptions = useSSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  : {};

module.exports = {
  development: {
    ...common,
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || 'database.sqlite',
    ...(process.env.DB_DIALECT === 'mysql' ||
    (process.env.DB_HOST && process.env.DB_HOST.includes('tidbcloud'))
      ? { dialectOptions: mysqlDialectOptions }
      : {})
  },
  test: {
    ...common,
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    ...common,
    dialect: process.env.DB_DIALECT || 'mysql',
    storage: process.env.DB_STORAGE,
    ...(process.env.DB_DIALECT === 'mysql' ||
    (process.env.DB_HOST && process.env.DB_HOST.includes('tidbcloud'))
      ? { dialectOptions: mysqlDialectOptions }
      : {})
  }
};
