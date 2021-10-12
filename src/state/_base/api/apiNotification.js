import AppNotification from '../../../components/notification/AppNotification';
import { appIntl } from '../../../translations/provider/TranslationsProvider';
import { getCode, getErrorMessage, getErrorType, getHttpStatus, getHttpStatusText, getMessage } from '../../../services/apiHelpers';

export const showApiResSuccessNotification = (res) => {
  AppNotification.success(
    appIntl.getMessage({
      id: 'ID_API_RESPONSE_SUCCESS_TITLE',
      values: {
        httpStatus: getHttpStatus(res),
        httpStatusText: getHttpStatusText(res),
        code: getCode(res)
      }
    }),
    getMessage(res) || appIntl.getMessage({id: 'ID_API_RESPONSE_SUCCESS_DEFAULT_MESSAGE'})
  );
};

export const showApiResFailureNotification = (res) => {
  AppNotification.error(
    appIntl.getMessage({
      id: 'ID_API_RESPONSE_FAILURE_TITLE',
      values: {
        httpStatus: getHttpStatus(res),
        httpStatusText: getHttpStatusText(res),
        code: getCode(res)
      }
    }),
    getMessage(res) || appIntl.getMessage({id: 'ID_API_RESPONSE_FAILURE_DEFAULT_MESSAGE'})
  );
};

export const showApiErrorNotification = (error) => {
  AppNotification.error(
    getErrorType(error) || appIntl.getMessage({id: 'ID_API_UNEXPECTED_ERROR_DEFAULT_TITLE'}),
    getErrorMessage(error) || appIntl.getMessage({id: 'ID_API_UNEXPECTED_ERROR_DEFAULT_MESSAGE'})
  );
};