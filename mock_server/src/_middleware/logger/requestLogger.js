const moment = require('moment');
const { ConsoleLogger } = require('../../helpers/loggers');

const DATE_FORMAT = 'DD-MM-yyyy HH:mm:ss';

const logRequest = (req) => {
  ConsoleLogger.info(
    `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n` +
    `>>> API REQUEST (${moment(new Date()).format(DATE_FORMAT)})\n` +
    `>>> id: ${req.headers['request-id']}\n` +
    `>>> ip: ${req.ip}\n` +
    `>>> uri: ${req.method} ${req.originalUrl}\n` +
    `>>> params: ${JSON.stringify(req.params)}\n` +
    `>>> body: ${JSON.stringify(req.body)}\n` +
    `>>> headers: ${JSON.stringify(req.headers)}\n` +
    `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n`
  );
};

const fetchResponseBody = async (res) => {
  return new Promise((resolve, reject) => {
    const oldWrite = res.write;
    const oldEnd = res.end;

    const bodyChucks = [];

    res.write = function (chunk) {
      bodyChucks.push(new Buffer.from(chunk));
      oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk) {
        bodyChucks.push(new Buffer.from(chunk));
      }
      const resBody = Buffer.concat(bodyChucks).toString('utf8');
      resolve(resBody);
      oldEnd.apply(res, arguments);
    };
  });
}

const logResponse = async (req, res, resBodyPromise) => {
  ConsoleLogger.info(
    `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n` +
    `<<< API RESPONSE (${moment(new Date()).format(DATE_FORMAT)})\n` +
    `<<< id: ${req.headers['request-id']}\n` +
    `<<< uri: ${req.method} ${req.originalUrl}\n` +
    `<<< httpStatus: ${res.statusCode} ${res.statusMessage}\n` +
    `<<< body: ${await resBodyPromise}\n` +
    `<<< headers: ${JSON.stringify(res.getHeaders())}\n` +
    `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n`
  );
};

exports.requestLogger = (req, res, next) => {
  logRequest(req);
  const resBodyPromise = fetchResponseBody(res);
  next();
  logResponse(req, res, resBodyPromise);
};
