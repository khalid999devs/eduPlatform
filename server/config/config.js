module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'edu_platform',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 200,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 2000,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
