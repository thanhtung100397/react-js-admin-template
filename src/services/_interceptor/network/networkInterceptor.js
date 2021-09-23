import React from 'react';
import { FormattedMessage } from 'react-intl';
import AppNotification from '../../../components/notification/AppNotification';

const isNetworkError = (error) => {
  return error.message === 'Network Error';
}

export const networkInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (isNetworkError(error)) {
        AppNotification.error(<FormattedMessage id="ID_NETWORK_ERROR_TITLE"/>, <FormattedMessage id="ID_NETWORK_ERROR_MESSAGE"/>)
      }
      return Promise.reject(error);
    });
};
