const { TypeChecker } = require('../helpers/typeChecker');

exports.extractRequestLanguage = (request) => {
  return request.query['lang'];
};

exports.extractRequestDelayMillis = (request) => {
  const delayMillis = parseInt(request.query['delayMillis']);
  return TypeChecker.isNumber(delayMillis)? delayMillis : undefined;
};
