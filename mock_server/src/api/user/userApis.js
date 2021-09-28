const { db } = require('../../database/dbClient');

exports.userApis = [
  {
    method: 'GET',
    path: '/api/user/info',
    authRequired: true,
    handle: async (req, res) => {
      res.jsonResponse({
        name: 'abc',
        age: 1
      })
    }
  }
];