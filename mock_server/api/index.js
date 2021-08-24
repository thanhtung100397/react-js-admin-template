
const appApis = [
];

exports.initAppApis = (app) => {
  appApis.forEach((api) => api(app));
};
