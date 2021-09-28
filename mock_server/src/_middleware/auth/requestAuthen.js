const jwt = require('express-jwt');
const { TOKEN_SIGNED_KEY, TOKEN_SIGNED_ALGORITHMS } = require('../../services/tokenService');

exports.jwtVerify = jwt({
  secret: TOKEN_SIGNED_KEY,
  algorithms: [TOKEN_SIGNED_ALGORITHMS],
  credentialsRequired: false
});

exports.requestAuthen = (req, res, next) => {
  console.log('Auth user', req.user);
  next();
};