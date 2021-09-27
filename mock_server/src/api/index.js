const { TypeChecker } = require('../helpers/typeChecker');

const { ConsoleLogger } = require('../helpers/loggers');
const { authApis } = require('./auth/authApis');
const { userApis } = require('./user/userApis');

const DEFAULT_METHOD = 'get';
const ALLOWED_METHODS = new Set(['get', 'head', 'post', 'put', 'patch', 'delete', 'connect', 'options', 'trace']);

const appApis = [
  authApis,
  userApis
];

const initApi = (app, api) => {
  let { method, path, handle } = api;
  if (!method) {
    method = DEFAULT_METHOD;
  }
  method = method.toLowerCase();
  if (!ALLOWED_METHODS.has(method)) {
    ConsoleLogger.warn(`Invalid api method (${method} ${path}), skip api registration`);
    return;
  }
  if (!path) {
    ConsoleLogger.warn(`Invalid api path (${method} ${path}), skip api registration`);
    return;
  }
  if (!handle) {
    ConsoleLogger.warn(`Missing api handler (${method} ${path}), skip api registration`);
    return;
  }
  app[method](
    path,
    (req, res, next) => {
      const handleResult = handle(req, res);
      if (TypeChecker.isPromise(handleResult)) {
        handleResult.catch(next);
      }
    }
  );
  ConsoleLogger.info(`${method} ${path} registered`)
};

const initGroupApis = (app, groupApis) => {
  groupApis.forEach((groupApi) => {
    if (!groupApi) {
      return;
    }
    initApi(app, groupApi);
  });
};

exports.initAppApis = (app) => {
  appApis.forEach((groupApis) => initGroupApis(app, groupApis));
};
