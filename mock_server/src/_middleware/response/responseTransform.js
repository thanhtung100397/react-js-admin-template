const { AppResponses, baseJsonResponse } = require('../../constants/responses');

exports.jsonResponseTransform = (req, res, next) => {
  res.jsonResponse = function (content) {
    let response, data;
    if (content) {
      response = content.response;
      data = content.data;
    }
    if (!response) {
      response = AppResponses.OK;
      data = content;
    }
    baseJsonResponse(req, res, response, data);
  };
  next();
};
