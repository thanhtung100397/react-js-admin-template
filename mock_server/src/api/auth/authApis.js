const { AppResponses } = require('../../constants/responses');
const { db } = require('../../database/dbClient');

exports.authApis = (app) => {
  app.post('/api/authentication/username-password',
    (req, res) => {
      const { lang } = req.query;
      const { username, password } = req.body;
      // let result = await db.getOne(
      //   'SELECT * FROM user WHERE username = $username AND password = $password',
      //   {
      //     username: username,
      //     password: password
      //   });
      res.jsonResponse({
        response: AppResponses.OK(lang),
        data: null
      })
    });
}
