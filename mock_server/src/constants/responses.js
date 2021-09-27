const { findTranslatedMessage } = require('../translations/appTranslations');
const { TypeChecker } = require('../helpers/typeChecker');

const extractRequestLanguage = (request) => {
  return request.query['lang'];
};

class AppResponse {
  constructor(httpStatus, code, msg) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.msg = msg;
  }
}

exports.AppResponse = AppResponse;

exports.baseJsonResponse = (req, res, response, data) => {
  if (TypeChecker.isFunction(response)) {
    const language = extractRequestLanguage(req);
    response = response(language);
  }
  res.status(response.httpStatus)
    .json({
      code: response.code,
      msg: response.msg,
      data: data
    });
};

exports.AppResponses = {
  OK: (lang) => new AppResponse(
    200,
    200,
    findTranslatedMessage('ID_SUCCESS', lang)
  ),
  UNEXPECTED_ERROR: (lang) => new AppResponse(
    500,
    500,
    findTranslatedMessage('ID_UNEXPECTED_ERROR', lang)
  ),
  API_NOT_FOUND: (lang) => new AppResponse(
    404,
    4041,
    findTranslatedMessage('ID_API_NOT_FOUND', lang)
  ),
  WRONG_USERNAME_OR_PASSWORD: (lang) => new AppResponse(
    401,
    4011,
    findTranslatedMessage('ID_WRONG_USERNAME_OR_PASSWORD', lang)
  )
};
