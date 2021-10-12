import { put } from 'redux-saga/effects';
import { API_FETCHING_ACTION } from '../../actionTypes';
import { TypeChecker } from '../../../utils/helpers';
import { isSuccess } from '../../../services/apiHelpers';
import {
  showApiErrorNotification, showApiResFailureNotification, showApiResSuccessNotification
} from './apiNotification';

const onApiFetching = (apiCall, apiActions) => function* (action) {
  if (!TypeChecker.isFunction(apiCall)) {
    return;
  }
  const res = yield apiCall(action.payload || {});
  if (isSuccess(res)) {
    yield handleApiResponseSuccess(res, apiActions, action);
  } else {
    yield handleApiResponseFailure(res, apiActions, action);
  }
};

function* handleApiResponseSuccess(res, apiActions, action) {
  if (action.showNoti) {
    showApiResSuccessNotification(res);
  }
  yield put(apiActions.API_RESPONSE_SUCCESS(res, action.id));
}

function* handleApiResponseFailure(res, apiActions, action) {
  if (action.showNoti) {
    showApiResFailureNotification(res);
  }
  yield put(apiActions.API_RESPONSE_FAILURE(res, action.id));
}

const handleApiFetchingError = (apiActions) => function* (error, action) {
  if (action.showNoti) {
    showApiErrorNotification(error);
  }
  yield put(apiActions.API_FETCHING_ERROR(error, action.id));
};

export const createApiSagas = (uniqueId, apiCall, apiActions) => {
  return [
    {
      action: API_FETCHING_ACTION(uniqueId),
      trigger: onApiFetching(apiCall, apiActions),
      onError: handleApiFetchingError(apiActions)
    }
  ]
};