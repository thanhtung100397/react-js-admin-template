const { corsConfig } = require('./cors/corsConfig');
const { requestDelay } = require('./delay/apiDelay');
const { requestId } = require('./info/requestId');
const { jwtVerify } = require('./auth/requestAuthen');
const { rejectToken } = require('./auth/rejectToken');
const { requestLogger } = require('./logger/requestLogger');
const bodyParser = require('body-parser');
const { jsonResponseTransform } = require('./response/responseTransform');
const { errorHandler, notFoundHandler } = require('./error/errorHandler');

const appPreMiddlewares = [
  corsConfig,
  requestDelay,
  requestId,
  jwtVerify,
  rejectToken,
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

