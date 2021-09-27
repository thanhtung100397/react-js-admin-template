const { RequestLogger } = require('../../helpers/loggers');

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
};

exports.requestLogger = (req, res, next) => {
  RequestLogger.request(req);
  const resBodyPromise = fetchResponseBody(res);
  next();
  RequestLogger.response(req, res, resBodyPromise);
};
