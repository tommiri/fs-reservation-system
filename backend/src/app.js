const express = require('express');
const cors = require('cors');

const reservations = require('./routes/reservations');

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: [
    'http://localhost:5173'
  ]
}));

app.use('/reservations', reservations);

app.get('/health', (_req, res) => {
  res.send('OK');
});

module.exports = app;
