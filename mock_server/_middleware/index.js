const { requestId } = require('./info/requestId');
const { requestLogger } = require('./logger/requestLogger');
const bodyParser = require('body-parser');

const appMiddlewares = [
  requestId,
  bodyParser.json(),
  requestLogger
];

exports.initAppMiddlewares = (app) => {
  appMiddlewares.forEach((middleware) => {
    app.use(middleware);
  });
};

