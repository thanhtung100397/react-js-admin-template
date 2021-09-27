const { AppResponse, AppResponses, baseJsonResponse } = require('../../constants/responses');
const { ConsoleLogger } = require('../../helpers/loggers');

exports.errorHandler = (err, req, res, next) => {
  if (err) {
    let { response, data } = err;
    if (!response && err instanceof AppResponse) {
      response = err;
    }
    if (!response) {
      ConsoleLogger.error('Unexpected error', err);
      response = AppResponses.UNEXPECTED_ERROR;
    }
    baseJsonResponse(req, res, response, data);
  }
};

exports.notFoundHandler = (req, res, next) => {
  baseJsonResponse(req, res, AppResponses.API_NOT_FOUND);
};