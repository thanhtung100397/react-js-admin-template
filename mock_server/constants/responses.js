const { findTranslatedMessage } = require('../translations/appTranslations');

exports.baseJsonResponse = (res, response, data) => {
  console.log(response);
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
  })
};
