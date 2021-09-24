const { AppResponses, baseJsonResponse } = require('../../constants/responses');

exports.jsonResponseTransform = (req, res, next) => {
  res.jsonResponse = function (content) {
    let { response, data } = content;
    if (!response) {
      response = AppResponses.OK();
      data = content;
    }
    baseJsonResponse(res, response, data);
  };
  next();
};
