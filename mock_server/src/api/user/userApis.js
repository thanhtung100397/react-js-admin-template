const { db } = require('../../database/dbClient');

exports.userApis = (app) => {
  app.get('/api/user/info',
    (req, res) => {
      res.jsonResponse({
        name: 'abc',
        age: 1
      })
    });
};
