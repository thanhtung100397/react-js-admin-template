import { put } from 'redux-saga/effects';
import { isShowNotification } from './apiAction';
import { API_FETCHING_ACTION } from '../../actionTypes';
import { TypeChecker } from '../../../utils/helpers';
import { isSuccess } from '../../../services/apiHelpers';
import {
  showApiErrorNotification, showApiResFailureNotification, showApiResSuccessNotification
} from './apiNotification';

const onApiFetching = (apiCall, ApiActions) => function* (action) {
  if (!TypeChecker.isFunction(apiCall)) {
    return;
  }
  const res = yield apiCall(action.payload || {});
  if (isSuccess(res)) {
    yield handleApiResponseSuccess(res, ApiActions, action);
  } else {
    yield handleApiResponseFailure(res, ApiActions, action);
  }
};

function* handleApiResponseSuccess(res, ApiActions, action) {
  if (isShowNotification(action)) {
    showApiResSuccessNotification(res);
  }
  yield put(ApiActions.API_RESPONSE_SUCCESS(res, action));
}

function* handleApiResponseFailure(res, ApiActions, action) {
  if (isShowNotification(action)) {
    showApiResFailureNotification(res);
  }
  yield put(ApiActions.API_RESPONSE_FAILURE(res, action));
}

const handleApiFetchingError = (ApiActions) => function* (error, action) {
  if (isShowNotification(action)) {
    showApiErrorNotification(error);
  }
  yield put(ApiActions.API_FETCHING_ERROR(error, action));
};

export const createApiSagas = (targetActionGroup, apiCall, ApiActions) => {
  return [
    {
      action: {
        type: API_FETCHING_ACTION,
        group: targetActionGroup
      },
      trigger: onApiFetching(apiCall, ApiActions),
      onError: handleApiFetchingError(ApiActions)
    }
  ]
};