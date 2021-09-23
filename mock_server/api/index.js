const { authApis } = require('./auth/authApis')

const appApis = [
  authApis
];

exports.initAppApis = (app) => {
  appApis.forEach((api) => api(app));
};
