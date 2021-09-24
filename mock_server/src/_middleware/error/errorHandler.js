const { AppResponses, baseJsonResponse } = require('../../constants/responses');

exports.errorHandler = (err, req, res, next) => {
  let { response, data } = err;
  if (!response) {
    response = AppResponses.UNEXPECTED_ERROR();
  }
  baseJsonResponse(res, response, data);
  next();
};
