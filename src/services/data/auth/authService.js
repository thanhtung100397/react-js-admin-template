import { LocalStorage } from '../../../utils/storageHelpers';
import { isBlank } from '../../../utils/stringHelpers';
import { InvalidAuthInfoError } from '../../../errors/appErrors';

const STORAGE_AUTH_IS_AUTH = 'auth.is_auth';
const STORAGE_AUTH_ACCESS_TOKEN_KEY = 'auth.access_token';
const STORAGE_AUTH_REFRESH_TOKEN_KEY = 'auth.refresh_token';

export const AuthInfoMapper = {
  fromLocal: () => ({
    accessToken: getAuthAccessToken(),
    refreshToken: getAuthRefreshToken()
  }),
  fromApiRes: (apiRes) => ({
    accessToken: apiRes?.data?.accessToken,
    refreshToken: apiRes?.data?.refreshToken
  })
};

export const isAuth = () => {
  return LocalStorage.get(STORAGE_AUTH_IS_AUTH) === 'true';
};

export const getAuthAccessToken = () => {
  return LocalStorage.get(STORAGE_AUTH_ACCESS_TOKEN_KEY);
};

export const getAuthRefreshToken = () => {
  return LocalStorage.get(STORAGE_AUTH_REFRESH_TOKEN_KEY);
};

export const getAuthInfo = () => {
  return AuthInfoMapper.fromLocal();
};

const validateAuthInfo = ({accessToken, refreshToken}) => {
  if (isBlank(accessToken)) {
    throw new InvalidAuthInfoError('accessToken', 'must not blank');
  }
  if (isBlank(refreshToken)) {
    throw new InvalidAuthInfoError('refreshToken', 'must not blank');
  }
};

export const saveAuthInfo = (authInfo) => {
  validateAuthInfo(authInfo);
  deleteAuthInfo();
  const { accessToken, refreshToken } = authInfo;
  LocalStorage.save(STORAGE_AUTH_IS_AUTH, true);
  LocalStorage.save(STORAGE_AUTH_ACCESS_TOKEN_KEY, accessToken);
  LocalStorage.save(STORAGE_AUTH_REFRESH_TOKEN_KEY, refreshToken);
  return getAuthInfo();
};

export const deleteAuthInfo = () => {
  LocalStorage.remove(STORAGE_AUTH_IS_AUTH);
  LocalStorage.remove(STORAGE_AUTH_ACCESS_TOKEN_KEY);
  LocalStorage.remove(STORAGE_AUTH_REFRESH_TOKEN_KEY);
};