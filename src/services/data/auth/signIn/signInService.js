import { appApiClient } from '../../../apiClient';

export const signIn = async (username, password) => {
  return await appApiClient.request({
    method: 'POST',
    url: 'api/oauth2/authentication/username-password',
    headers: {
      client_id: process.env.REACT_APP_OAUTH2_CLIENT_ID,
      secret: process.env.REACT_APP_OAUTH2_CLIENT_SECRET
    },
    data: {
      username: username,
      password: password
    }
  });
};
