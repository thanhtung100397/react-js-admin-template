const moment = require('moment');

const LOGGER_DATE_FORMAT = 'DD-MM-yyyy HH:mm:ss';

const ENABLE_ALL_LOGGER = process.env.ENABLE_ALL_LOGGER || true;
const ENABLE_INFO_LOGGER = process.env.ENABLE_INFO_LOGGER || true;
const ENABLE_WARN_LOGGER = process.env.ENABLE_WARN_LOGGER || true;
const ENABLE_DEBUG_LOGGER = process.env.ENABLE_DEBUG_LOGGER || true;
const ENABLE_ERROR_LOGGER = process.env.ENABLE_ERROR_LOGGER || true;
const ENABLE_REQUEST_LOGGER = process.env.ENABLE_REQUEST_LOGGER || true;
const ENABLE_RESPONSE_LOGGER = process.env.ENABLE_RESPONSE_LOGGER || true;
const ENABLE_QUERY_LOGGER = process.env.ENABLE_QUERY_LOGGER || true;

const LoggerType = {
  INFO: {
    enable: ENABLE_INFO_LOGGER,
    name: 'INFO'
  },
  WARN: {
    enable: ENABLE_WARN_LOGGER,
    name: 'WARN'
  },
  DEBUG: {
    enable: ENABLE_DEBUG_LOGGER,
    name: 'DEBUG'
  },
  ERROR: {
    enable: ENABLE_ERROR_LOGGER,
    name: 'ERROR'
  },

  REQUEST: {
    enable: ENABLE_REQUEST_LOGGER,
    name: 'REQUEST'
  },
  RESPONSE: {
    enable: ENABLE_RESPONSE_LOGGER,
    name: 'RESPONSE'
  },

  QUERY: {
    enable: ENABLE_QUERY_LOGGER,
    name: 'QUERY'
  }
};

const isLoggerEnable = (type) => {
  if (!ENABLE_ALL_LOGGER) {
    return false;
  }
  return LoggerType[type]? LoggerType[type].enable : true;
};

const formatLoggerMessage = (type, rawMessage) => {
  return `[${type.name}][${moment(new Date()).format(LOGGER_DATE_FORMAT)}] ${rawMessage}`;
};

exports.ConsoleLogger = {
  info: (message, ...data) => isLoggerEnable(LoggerType.INFO) &&
    console.info(formatLoggerMessage(LoggerType.INFO, message), ...data),
  warn: (message, ...data) => isLoggerEnable(LoggerType.WARN) &&
    console.warn(formatLoggerMessage(LoggerType.WARN, message), ...data),
  debug: (message, ...data) => isLoggerEnable(LoggerType.DEBUG) &&
    console.debug(formatLoggerMessage(LoggerType.DEBUG, message), ...data),
  error: (message, ...data) => isLoggerEnable(LoggerType.ERROR) &&
    console.error(formatLoggerMessage(LoggerType.ERROR, message), ...data)
};

exports.RequestLogger = {
  request: (req) => isLoggerEnable(LoggerType.REQUEST) && console.info(
    `\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n` +
    `>>> API REQUEST (${moment(new Date()).format(LOGGER_DATE_FORMAT)})\n` +
    `>>> id: ${req.headers['request-id']}\n` +
    `>>> ip: ${req.ip}\n` +
    `>>> uri: ${req.method} ${req.originalUrl}\n` +
    `>>> params: ${JSON.stringify(req.query)}\n` +
    `>>> body: ${JSON.stringify(req.body)}\n` +
    `>>> headers: ${JSON.stringify(req.headers)}\n` +
    `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n`
  ),
  response: async (req, res, resBodyPromise) => isLoggerEnable(LoggerType.RESPONSE) && console.info(
    `\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n` +
    `<<< API RESPONSE (${moment(new Date()).format(LOGGER_DATE_FORMAT)})\n` +
    `<<< id: ${req.headers['request-id']}\n` +
    `<<< uri: ${req.method} ${req.originalUrl}\n` +
    `<<< httpStatus: ${res.statusCode} ${res.statusMessage}\n` +
    `<<< body: ${await resBodyPromise}\n` +
    `<<< headers: ${JSON.stringify(res.getHeaders())}\n` +
    `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n`
  )
};

exports.QueryLogger = {
  logQuery: (query, params, results, startTime, endTime) => isLoggerEnable(LoggerType.QUERY) && console.info(
    `\n##############################################################################################################\n` +
    `>>> Query (${moment(startTime).format(LOGGER_DATE_FORMAT)})\n` +
    query +
    `\n>>> Params\n` +
    JSON.stringify(params) +
    `\n<<< Results (${moment(endTime).format(LOGGER_DATE_FORMAT)})\n` +
    JSON.stringify(results) +
    `\n##############################################################################################################\n`
  )
};
