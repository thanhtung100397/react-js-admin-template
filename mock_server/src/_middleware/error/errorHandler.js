const { AppResponse, AppResponses, baseJsonResponse } = require('../../constants/responses');
const { ConsoleLogger } = require('../../helpers/loggers');

const errorHandlers = [
  {
    shouldHandle: (err) => err instanceof AppResponse,// handle when: throw AppResponse.FOO
    handle: (err) => {
      return {
        response: err,
        data: err.data
      }
    }
  },
  {
    shouldHandle: (err) => err.response,// handle when: throw { response: AppResponse.FOO, data: ...}
    handle: (err) => {
      return {
        response: err.response,
        data: err.data
      }
    }
  }
];

exports.errorHandler = (err, req, res, next) => {
  if (err) {
    let resData;
    for (const errorHandler of errorHandlers) {
      if (errorHandler.shouldHandle(err, req, res)) {
        resData = errorHandler.handle(err, req, res);
        break;
      }
    }
    if (!resData) {
      ConsoleLogger.error('Unexpected error', err);
      resData = {
        response: AppResponses.UNEXPECTED_ERROR
      }
    }
    baseJsonResponse(req, res, resData.response, resData.data);
  }
};

exports.notFoundHandler = (req, res, next) => {
  baseJsonResponse(req, res, AppResponses.API_NOT_FOUND);
};