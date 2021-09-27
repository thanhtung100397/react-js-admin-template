const { findTranslatedMessage } = require('../translations/appTranslations');

const extractRequestLanguage = (request) => {
  return request.query['lang'];
};

class AppResponse {
  constructor(httpStatus, code, msgId) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.msgId = msgId;
  }

  getMessage(lang) {
    return findTranslatedMessage(this.msgId, lang);
  }
}

exports.AppResponse = AppResponse;

exports.baseJsonResponse = (req, res, response, data) => {
  const inputLang = extractRequestLanguage(req);
  res.status(response.httpStatus)
    .json({
      code: response.code,
      msg: response.getMessage(inputLang),
      data: data
    });
};

exports.AppResponses = {
  OK: new AppResponse(
    200,
    200,
    'ID_SUCCESS'
  ),
  UNEXPECTED_ERROR: new AppResponse(
    500,
    500,
    'ID_UNEXPECTED_ERROR'
  ),
  API_NOT_FOUND: new AppResponse(
    404,
    4041,
    'ID_API_NOT_FOUND'
  ),
  WRONG_USERNAME_OR_PASSWORD: new AppResponse(
    401,
    4011,
    'ID_WRONG_USERNAME_OR_PASSWORD'
  ),
  USER_BANNED: new AppResponse(
    401,
    4012,
    'ID_USER_BANNED'
  )
};
