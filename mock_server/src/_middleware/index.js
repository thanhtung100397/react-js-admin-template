const { requestId } = require('./info/requestId');
const { requestLogger } = require('./logger/requestLogger');
const bodyParser = require('body-parser');
const { jsonResponseTransform } = require('./response/responseTransform');
const { errorHandler, notFoundHandler } = require('./error/errorHandler');

const appPreMiddlewares = [
  requestId,
  bodyParser.json(),
  requestLogger,
  jsonResponseTransform
];

const appPostMiddlewares = [
  errorHandler,
  notFoundHandler// MUST put this on the VERY BOTTOM
];

exports.initAppPreMiddlewares = (app) => {
  appPreMiddlewares.forEach((middleware) => {
    app.use(middleware);
  });
};

exports.initAppPostMiddlewares = (app) => {
  appPostMiddlewares.forEach((middleware) => {
    app.use(middleware);
  });
};

