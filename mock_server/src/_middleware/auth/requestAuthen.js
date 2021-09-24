const jwt = require('express-jwt');

exports.jwtVerify = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: [process.env.JWT_ALGORITHMS],
  credentialsRequired: false
});

exports.requestAuthen = (req, res, next) => {
  console.log('Auth user', req.user);
  next();
};