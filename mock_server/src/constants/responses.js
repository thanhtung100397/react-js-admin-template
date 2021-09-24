const { findTranslatedMessage } = require('../translations/appTranslations');
const { TypeChecker } = require('../helpers/typeChecker');

const extractRequestLanguage = (request) => {
  return request.query['lang'];
};

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
  OK: (lang) => ({
    httpStatus: 200,
    code: 200,
    msg: findTranslatedMessage('ID_SUCCESS', lang)
  }),
  UNEXPECTED_ERROR: (lang) => ({
    httpStatus: 500,
    code: 500,
    msg: findTranslatedMessage('ID_UNEXPECTED_ERROR', lang),
  }),
  API_NOT_FOUND: (lang) => ({
    httpStatus: 404,
    code: 4041,
    msg: findTranslatedMessage('ID_API_NOT_FOUND', lang),
  })
};
