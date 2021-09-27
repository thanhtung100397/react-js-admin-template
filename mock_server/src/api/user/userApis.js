const { db } = require('../../database/dbClient');

exports.userApis = [
  {
    method: 'GET',
    path: '/api/user/info',
    handle: async (req, res) => {
      res.jsonResponse({
        name: 'abc',
        age: 1
      })
    }
  }
];