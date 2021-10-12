const {
  newTokenPair, verifyToken, newAccessToken,
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_EXPIRATION_SECONDS
} = require('../../services/tokenService');
const { db } = require('../../database/dbClient');
const { AppResponses } = require('../../constants/responses');

exports.authApis = [
  {
    method: 'POST',
    path: '/api/authentication/username-password',
    handle: async (req, res) => {
      const { username, password } = req.body;
      const userInfo = await db.getOne(
        'SELECT id, username, banned FROM user WHERE username = $username AND password = $password',
        {
          $username: username,
          $password: password
        }
      );
      if (!userInfo) {
        throw AppResponses.WRONG_USERNAME_OR_PASSWORD
      }
      if (userInfo.banned) {
        throw AppResponses.USER_BANNED;
      }
      const tokenPair = newTokenPair(userInfo);
      res.jsonResponse({
        userId: userInfo.id,
        username: userInfo.username,
        ...tokenPair,
        accessTokenExpiration: ACCESS_TOKEN_EXPIRATION_SECONDS,
        refreshTokenExpiration: REFRESH_TOKEN_EXPIRATION_SECONDS
      });
    }
  },
  {
    method: 'POST',
    path: '/api/authentication/refresh-token',
    authRequired: false,
    handle: async (req, res) => {
      const { refreshToken } = req.body;
      const tokenPayload = verifyToken(refreshToken);
      res.jsonResponse({
        id: tokenPayload.id,
        username: tokenPayload.username,
        accessToken: newAccessToken(tokenPayload),
        refreshToken: refreshToken,
        accessTokenExpiration: ACCESS_TOKEN_EXPIRATION_SECONDS,
        refreshTokenExpiration: REFRESH_TOKEN_EXPIRATION_SECONDS
      })
    }
  }
];
