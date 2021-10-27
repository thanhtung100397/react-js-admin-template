const { extractRequestLanguage } = require('./requests');
const { findTranslatedMessage } = require('../translations/appTranslations');
const { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } = require('../constants/constants');

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

exports.pagination = (req) => {
  let { pageIndex, pageSize } = req.query;
  pageIndex = parseInt(pageIndex);
  pageSize = parseInt(pageSize);

  if (!pageIndex || pageIndex < 0) {
    pageIndex = 0;
  }
  if (!pageSize || pageSize < 0) {
    pageSize = DEFAULT_PAGE_SIZE;
  }
  if (pageSize > MAX_PAGE_SIZE) {
    pageSize = MAX_PAGE_SIZE;
  }
  return {
    offset: pageIndex * pageSize,
    limit: pageSize
  }
};

exports.basePageResult = (offset, limit, items, totalItems) => ({
  pageIndex: offset / limit,
  pageSize: limit,
  totalItems: totalItems,
  items: items
});

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
  // 200x
  OK: new AppResponse(
    200,
    200,
    'ID_SUCCESS'
  ),

  // 500x
  UNEXPECTED_ERROR: new AppResponse(
    500,
    500,
    'ID_UNEXPECTED_ERROR'
  ),

  //404x
  API_NOT_FOUND: new AppResponse(
    404,
    4041,
    'ID_API_NOT_FOUND'
  ),
  USER_NOT_FOUND: new AppResponse(
    404,
    4042,
    'ID_USER_NOT_FOUND'
  ),

  // 401x
  WRONG_USERNAME_OR_PASSWORD: new AppResponse(
    401,
    4011,
    'ID_WRONG_USERNAME_OR_PASSWORD'
  ),
  USER_BANNED: new AppResponse(
    401,
    4012,
    'ID_USER_BANNED'
  ),
  EXPIRED_TOKEN: new AppResponse(
    401,
    4013,
    'ID_EXPIRED_TOKEN'
  ),
  INVALID_TOKEN: new AppResponse(
    401,
    4014,
    'ID_INVALID_TOKEN'
  ),
  ENDPOINT_AUTHORIZATION_REQUIRED: new AppResponse(
    401,
    4015,
    'ID_ENDPOINT_AUTHORIZATION_REQUIRED'
  ),
  REFRESH_TOKEN_AUTHORIZATION_REJECTED: new AppResponse(
    401,
    4016,
    'ID_REFRESH_TOKEN_AUTHORIZATION_REJECTED'
  ),
};
