import AppNotification from '../../../components/notification/AppNotification';
import { appIntl } from '../../../translations/provider/TranslationsProvider';

const isNetworkError = (error) => {
  return error.message === 'Network Error';
};

export const networkInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (isNetworkError(error)) {
        AppNotification.error(
          appIntl.getMessage({id: 'ID_NETWORK_ERROR_TITLE'}),
          appIntl.getMessage({id: 'ID_NETWORK_ERROR_MESSAGE'})
        )
      }
      return Promise.reject(error);
    });
};
