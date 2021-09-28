import { appApiClient } from '../../../apiClient';

export const signIn = async (username, password) => {
  return await appApiClient.request({
    method: 'POST',
    url: 'api/authentication/username-password',
    data: {
      username: username,
      password: password
    }
  });
};
