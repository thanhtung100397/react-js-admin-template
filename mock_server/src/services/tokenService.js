const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const TOKEN_SIGNED_KEY = process.env.JWT_SECRET || 'Secret';
const TOKEN_SIGNED_ALGORITHMS = process.env.JWT_ALGORITHMS || 'HS256';
const ACCESS_TOKEN_EXPIRATION_SECONDS = parseInt(process.env.ACCESS_TOKEN_EXPIRATION_SECONDS || 0);
const REFRESH_TOKEN_EXPIRATION_SECONDS = parseInt(process.env.REFRESH_TOKEN_EXPIRATION_SECONDS || 0);

const generateTokenId = () => {
  return uuid.v4();
};

const tokenCustomClaims = (payload) => {
  return {
    userId: payload.id,
    username: payload.username
  }
};

const verifyToken = (token) => {
  return jwt.verify(token, TOKEN_SIGNED_KEY, {
    algorithms: TOKEN_SIGNED_ALGORITHMS
  })
};
exports.verifyToken = verifyToken;

const newAccessToken = (payload, tokenId = generateTokenId()) => {
  return jwt.sign(
    tokenCustomClaims(payload),
    TOKEN_SIGNED_KEY,
    {
      jwtid: tokenId,
      algorithm: TOKEN_SIGNED_ALGORITHMS,
      expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS
    }
  );
};
exports.newAccessToken = newAccessToken;

const newRefreshToken = (payload, accessTokenId) => {
  return jwt.sign(
    {
      ...tokenCustomClaims(payload),
      ati: accessTokenId
    },
    TOKEN_SIGNED_KEY,
    {
      jwtid: uuid.v4(),
      algorithm: TOKEN_SIGNED_ALGORITHMS,
      expiresIn: REFRESH_TOKEN_EXPIRATION_SECONDS
    }
  );
};
exports.newRefreshToken = newRefreshToken;

exports.newTokenPair = (payload) => {
  const accessTokenId = generateTokenId();
  return {
    accessToken: newAccessToken(payload, accessTokenId),
    refreshToken: newRefreshToken(payload, accessTokenId)
  }
};

exports.TOKEN_SIGNED_KEY = TOKEN_SIGNED_KEY;
exports.TOKEN_SIGNED_ALGORITHMS = TOKEN_SIGNED_ALGORITHMS;
exports.ACCESS_TOKEN_EXPIRATION_SECONDS = ACCESS_TOKEN_EXPIRATION_SECONDS;
exports.REFRESH_TOKEN_EXPIRATION_SECONDS = REFRESH_TOKEN_EXPIRATION_SECONDS;