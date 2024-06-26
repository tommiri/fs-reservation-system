const { Sequelize } = require('sequelize');

require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: 'mysql',
  logging: false,
});

// Authenticate the Sequelize instance
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.error('Error connecting to database: ', error);
  });

module.exports = sequelize;
