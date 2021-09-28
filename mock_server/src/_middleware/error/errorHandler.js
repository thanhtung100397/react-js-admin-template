const { AppResponse, AppResponses, baseJsonResponse } = require('../../constants/responses');
const { ConsoleLogger } = require('../../helpers/loggers');

const { UnauthorizedError } = require('express-jwt');
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

const errorHandlers = [
  {
    shouldHandle: (err) => err instanceof TokenExpiredError ||
      (err instanceof UnauthorizedError && err.inner instanceof TokenExpiredError),
    handle: (err) => ({
        response: AppResponses.EXPIRED_TOKEN,
    })
  },
  {
    shouldHandle: (err) => err instanceof JsonWebTokenError ||
      (err instanceof UnauthorizedError && err.code === 'invalid_token'),
    handle: (err) => ({
      response: AppResponses.INVALID_TOKEN,
    })
  },
  {
    shouldHandle: (err) => err instanceof UnauthorizedError && err.code === 'credentials_required',
    handle: (err) => ({
      response: AppResponses.ENDPOINT_AUTHORIZATION_REQUIRED,
    })
  },
  {
    shouldHandle: (err) => err instanceof AppResponse,// handle when: throw AppResponse.FOO
    handle: (err) => ({
        response: err,
        data: err.data
    })
  },
  {
    shouldHandle: (err) => err.response,// handle when: throw { response: AppResponse.FOO, data: ...}
    handle: (err) => ({
        response: err.response,
        data: err.data
    })
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
    if (!resData || !resData.response) {
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