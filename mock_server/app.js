const express = require('express');
const { initAppMiddlewares } = require('./_middleware');
const { initAppApis } = require('./api');
const app = express();

// config
const port = process.env.REACT_APP_MOCK_SERVER_PORT || 8000;

// middleware config
initAppMiddlewares(app);

// app apis init
initAppApis(app);

app.listen(port, () => {
  console.log(`Mock server running: http://localhost:${port}`)
});

module.exports = app;


