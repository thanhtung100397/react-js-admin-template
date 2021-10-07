import { put } from 'redux-saga/effects';
import {
  API_FETCHING_ACTION
} from './apiAction';
import { TypeChecker } from '../../../utils/helpers';
import { isSuccess } from '../../../services/apiHelpers';

const onApiFetching = (apiCall, apiAction) => function* (action) {
  if (!TypeChecker.isFunction(apiCall)) {
    return;
  }
  const res = yield apiCall(action.payload || {});
  if (isSuccess(res)) {
    yield put(apiAction.API_RESPONSE_SUCCESS(res));
  } else {
    yield put(apiAction.API_RESPONSE_FAILURE(res));
  }
};

const handleApiFetchingError = (apiAction) => function* (error) {
  yield put(apiAction.API_FETCHING_ERROR(error));
};

export const createApiSagas = (uniqueId, apiCall, apiAction) => {
  return [
    {
      action: API_FETCHING_ACTION(uniqueId),
      trigger: onApiFetching(apiCall, apiAction),
      onError: handleApiFetchingError(apiAction)
    }
  ]
};