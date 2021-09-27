const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const TOKEN_SIGNED_KEY = process.env.JWT_SECRET;
const TOKEN_SIGNED_ALGORITHMS = process.env.JWT_ALGORITHMS;
const ACCESS_TOKEN_EXPIRATION_SECONDS = process.env.ACCESS_TOKEN_EXPIRATION_SECONDS;
const REFRESH_TOKEN_EXPIRATION_SECONDS = process.env.REFRESH_TOKEN_EXPIRATION_SECONDS;

const generateTokenId = () => {
  return uuid.v4();
};

const tokenCustomClaims = (userInfo) => {
  return {
    userId: userInfo.id,
    username: userInfo.username
  }
};

const newAccessToken = (userInfo, tokenId = generateTokenId()) => {
  return jwt.sign(
    tokenCustomClaims(userInfo),
    TOKEN_SIGNED_KEY,
    {
      jwtid: tokenId,
      algorithm: TOKEN_SIGNED_ALGORITHMS,
      expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS
    }
  );
};

const newRefreshToken = (userInfo, accessTokenId) => {
  return jwt.sign(
    tokenCustomClaims(userInfo),
    TOKEN_SIGNED_KEY,
    {
      jwtid: uuid.v4(),
      algorithm: TOKEN_SIGNED_ALGORITHMS,
      expiresIn: REFRESH_TOKEN_EXPIRATION_SECONDS
    }
  );
};

exports.newTokenPair = (userInfo) => {
  const accessTokenId = generateTokenId();
  return {
    accessToken: newAccessToken(userInfo, accessTokenId),
    refreshToken: newRefreshToken(userInfo, accessTokenId)
  }
};

exports.newAccessToken = newAccessToken;

exports.newRefreshToken = newRefreshToken;

exports.ACCESS_TOKEN_EXPIRATION_SECONDS = ACCESS_TOKEN_EXPIRATION_SECONDS;
exports.REFRESH_TOKEN_EXPIRATION_SECONDS = REFRESH_TOKEN_EXPIRATION_SECONDS;