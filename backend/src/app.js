const express = require('express');
const cors = require('cors');

const reservations = require('./routes/reservations');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/reservations', reservations);

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

module.exports = app;
