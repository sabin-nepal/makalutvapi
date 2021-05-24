const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
  host: 'localhost',
  dialect: 'mysql',
  define: { charset: 'utf8', dialectOptions: { collate: 'utf8_general_ci' }, },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

db.sync();

module.exports = db;
