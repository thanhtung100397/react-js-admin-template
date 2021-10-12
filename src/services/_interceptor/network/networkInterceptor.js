import AppNotification from '../../../components/notification/AppNotification';
import { appIntl } from '../../../translations/provider/TranslationsProvider';
import { hasInternetConnection } from '../../../utils/browserHelpers';
import { CUSTOM_ERROR_MESSAGE_FIELD, CUSTOM_ERROR_TYPE_FIELD } from '../../apiClient';

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
        let errorTitle, errorMessage;
        if (hasInternetConnection()) {
          errorTitle = appIntl.getMessage({id: 'ID_NETWORK_ERROR_SERVER_REFUSED_CONNECTION_TITLE'});
          errorMessage = appIntl.getMessage({id: 'ID_NETWORK_ERROR_SERVER_REFUSED_CONNECTION_MESSAGE'});
        } else {
          errorTitle = appIntl.getMessage({id: 'ID_NETWORK_ERROR_NO_INTERNET_TITLE'});
          errorMessage = appIntl.getMessage({id: 'ID_NETWORK_ERROR_NO_INTERNET_MESSAGE'});
        }
        AppNotification.error(errorTitle, errorMessage);
        error[CUSTOM_ERROR_TYPE_FIELD] = errorTitle;
        error[CUSTOM_ERROR_MESSAGE_FIELD] = errorMessage;
      }
      return Promise.reject(error);
    });
};
