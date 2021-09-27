const { AppResponse, AppResponses, baseJsonResponse } = require('../../constants/responses');
const { ConsoleLogger } = require('../../helpers/loggers');

exports.errorHandler = (err, req, res, next) => {
  if (err) {
    let response, data;
    if (err instanceof AppResponse) {
      response = err;
    } else {
      response = err.response;
      data = err.data;
    }
    if (!response) {
      ConsoleLogger.error(err);
      response = AppResponses.UNEXPECTED_ERROR;
    }
    baseJsonResponse(req, res, response, data);
  }
};

exports.notFoundHandler = (req, res, next) => {
  baseJsonResponse(req, res, AppResponses.API_NOT_FOUND);
};