const { TypeChecker } = require('../helpers/typeChecker');
const { updateNoAuthRequiredPaths } = require('../_middleware/auth/requestAuthen');
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
  let { method, path, handle, authRequired } = api;
  if (!method) {
    method = DEFAULT_METHOD;
  }
  const lcMethod = method.toLowerCase();
  if (!ALLOWED_METHODS.has(lcMethod)) {
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
  app[lcMethod](
    path,
    (req, res, next) => {
      const handleResult = handle(req, res);
      if (TypeChecker.isPromise(handleResult)) {
        handleResult.catch(next);
      }
    }
  );
  ConsoleLogger.info(`${method} ${path} ${authRequired ? '(auth) ' : ''}registered`);
  return true;
};

const initGroupApis = (app, groupApis, noAuthRequiredPaths) => {
  groupApis.forEach((groupApi) => {
    if (!groupApi) {
      return;
    }
    if (initApi(app, groupApi)) {
      if (!groupApi.authRequired) {
        addNoAuthRequiredPaths(noAuthRequiredPaths, groupApi.path, groupApi.method);
      }
    }
  });
};

const addNoAuthRequiredPaths = (containers, path, method) => {
  let pathConfigs = containers[path];
  if (!pathConfigs) {
    pathConfigs = new Set();
    containers[path] = pathConfigs;
  }
  pathConfigs.add(method);
};

exports.initAppApis = (app) => {
  const noAuthRequiredPaths = {};
  appApis.forEach((groupApis) => initGroupApis(app, groupApis, noAuthRequiredPaths));
  updateNoAuthRequiredPaths(Object.keys(noAuthRequiredPaths).map((key) => ({
    url: key,
    methods: [...noAuthRequiredPaths[key]]
  })));
};
