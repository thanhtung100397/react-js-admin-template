const jwt = require('express-jwt');
const { TOKEN_SIGNED_KEY, TOKEN_SIGNED_ALGORITHMS } = require('../../services/tokenService');
const { ConsoleLogger } = require('../../helpers/loggers');

let noAuthRequiredPaths = [];

exports.updateNoAuthRequiredPaths = (paths) => {
  noAuthRequiredPaths.splice(0, noAuthRequiredPaths.length, ...paths);
  ConsoleLogger.info('No Authorization Required Paths', noAuthRequiredPaths);
};

exports.jwtVerify = jwt({
  secret: TOKEN_SIGNED_KEY,
  algorithms: [TOKEN_SIGNED_ALGORITHMS]
}).unless({
  path: noAuthRequiredPaths
});