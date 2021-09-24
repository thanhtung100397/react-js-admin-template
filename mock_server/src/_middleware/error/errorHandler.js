const { AppResponses, baseJsonResponse } = require('../../constants/responses');
const { ConsoleLogger } = require('../../helpers/loggers');

exports.errorHandler = (err, req, res, next) => {
  let { response, data } = err;
  if (!response) {
    ConsoleLogger.error(err);
    response = AppResponses.UNEXPECTED_ERROR;
  }
  baseJsonResponse(req, res, response, data);
  next();
};
