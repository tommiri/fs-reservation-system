require('dotenv').config();
const app = require('./app');
const sequelize = require('./db/sequelize');

const PORT = process.env.PORT || 3001;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Something went wrong: ', error);
  });
