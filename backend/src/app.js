const express = require('express');

const reservations = require('./routes/reservations');

const app = express();
app.use(express.json());

app.use('/reservations', reservations);

app.get('/health', (_req, res) => {
  res.send('OK');
});

module.exports = app;
