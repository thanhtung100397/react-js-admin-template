const uuid = require('uuid');

exports.requestId = (req, res, next) => {
  req.headers['request-id'] = uuid.v4();
  next();
};
