import { put } from 'redux-saga/effects';
import { isShowNotification } from './apiAction';
import { API_FETCHING_ACTION } from '../../actionTypes';
import { TypeChecker } from '../../../utils/helpers';
import { isSuccess } from '../../../services/apiHelpers';
import {
  showApiErrorNotification, showApiResFailureNotification, showApiResSuccessNotification
} from './apiNotification';

const onApiFetching = (apiCall) => function* (action) {
  if (!TypeChecker.isFunction(apiCall)) {
    return;
  }
  return yield apiCall(action.payload || {});
};

const handleApiResponse = (ApiActions) => function*(res, action) {
  const showNoti = isShowNotification(action);
  if (isSuccess(res)) {
    if (showNoti) {
      showApiResSuccessNotification(res);
    }
    yield put(ApiActions.API_RESPONSE_SUCCESS(res, action));
  } else {
    if (showNoti) {
      showApiResFailureNotification(res);
    }
    yield put(ApiActions.API_RESPONSE_FAILURE(res, action));
  }
};

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
      trigger: onApiFetching(apiCall),
      onDone: handleApiResponse(ApiActions),
      onError: handleApiFetchingError(ApiActions)
    }
  ]
};