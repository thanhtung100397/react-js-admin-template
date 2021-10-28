import { LocalStorage } from '../../../utils/storageHelpers';

const STORAGE_AUTH_USER_ID_KEY = 'auth.user_id';
const STORAGE_AUTH_USERNAME_KEY = 'auth.username';
const STORAGE_AUTH_ACCESS_TOKEN_KEY = 'auth.access_token';
const STORAGE_AUTH_REFRESH_TOKEN_KEY = 'auth.refresh_token';

export const isAuth = () => {
  return Boolean(getAuthUserId());
};

export const getAuthUserId = () => {
  LocalStorage.get(STORAGE_AUTH_USER_ID_KEY);
};

export const getAuthUsername = () => {
  LocalStorage.get(STORAGE_AUTH_USERNAME_KEY);
};

export const getAuthAccessToken = () => {
  LocalStorage.get(STORAGE_AUTH_ACCESS_TOKEN_KEY);
};

export const getAuthRefreshToken = () => {
  LocalStorage.get(STORAGE_AUTH_REFRESH_TOKEN_KEY);
};

export const getAuthInfo = () => {
  if (!isAuth()) {
    return {};
  }
  return {
    userId: getAuthUserId(),
    username: getAuthUsername(),
    accessToken: getAuthAccessToken(),
    refreshToken: getAuthRefreshToken()
  }
};

export const saveAuthInfo = ({userId, username, accessToken, refreshToken}) => {
  LocalStorage.save(STORAGE_AUTH_USER_ID_KEY, userId);
  LocalStorage.save(STORAGE_AUTH_USERNAME_KEY, username);
  LocalStorage.save(STORAGE_AUTH_ACCESS_TOKEN_KEY, accessToken);
  LocalStorage.save(STORAGE_AUTH_REFRESH_TOKEN_KEY, refreshToken);
};

export const deleteAuthInfo = () => {
  LocalStorage.remove(STORAGE_AUTH_USER_ID_KEY);
  LocalStorage.remove(STORAGE_AUTH_USERNAME_KEY);
  LocalStorage.remove(STORAGE_AUTH_ACCESS_TOKEN_KEY);
  LocalStorage.remove(STORAGE_AUTH_REFRESH_TOKEN_KEY);
};