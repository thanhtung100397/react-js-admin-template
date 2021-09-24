const { authApis } = require('./auth/authApis');
const { userApis} = require('./user/userApis');

const appApis = [
  authApis,
  userApis
];

exports.initAppApis = (app) => {
  appApis.forEach((api) => api(app));
};
