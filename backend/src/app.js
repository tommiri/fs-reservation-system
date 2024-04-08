const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.send('OK');
});

module.exports = app;
