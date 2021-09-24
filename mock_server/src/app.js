const express = require('express');
const { initAppPreMiddlewares, initAppPostMiddlewares } = require('./_middleware');
const { initAppApis } = require('./api');
const app = express();

// config
const port = process.env.SERVER_PORT || 8000;

// pre middleware config
initAppPreMiddlewares(app);

// app apis init
initAppApis(app);

// post middleware config
initAppPostMiddlewares(app);

app.listen(port, () => {
  console.log(`Mock server running: http://localhost:${port}`)
});

module.exports = app;


