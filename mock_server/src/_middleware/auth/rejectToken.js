const { AppResponses } = require('../../constants/responses');

exports.rejectToken = (req, res, next) => {
  const { user } = req;
  if (user && user.ati) {
    throw AppResponses.REFRESH_TOKEN_AUTHORIZATION_REJECTED;
  }
  next();
};