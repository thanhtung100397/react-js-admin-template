import {
  getCode, getData, getHeaders, getHttpStatus, getMessage, isSuccess, getErrorMessage, getErrorType, getHttpStatusText
} from '../../../services/apiHelpers';
import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION, API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION,
  UNEXPECTED_REDUCER_ERROR_ACTION
} from '../../actionTypes';
import { StateHelpers } from '../../../utils/stateHelpers';
import { getFetchActionId } from './apiAction';
import { createAppReducer } from '../appReducer';

export const API_FETCHING_STATUS_FIELD = 'fetchingStatus';

export const FetchingStatus = {
  IDLE: 'IDLE',
  IN_PROGRESS: 'IN_PROGRESS',
  ERROR: 'ERROR',
};

export const apiResToState = (res) => {
  const success = isSuccess(res);
  return {
    [API_FETCHING_STATUS_FIELD]: FetchingStatus.IDLE,
    isSuccess: success,
    isFailure: !success, // this field is NOT redundant
    httpStatus: getHttpStatus(res),
    httpStatusText: getHttpStatusText(res),
    headers: getHeaders(res),
    code: getCode(res),
    message: getMessage(res),
    data: getData(res),
    error: undefined,
    errorType: undefined
  }
};

export const apiFetchingErrorToState = (error) => ({
  [API_FETCHING_STATUS_FIELD]: FetchingStatus.ERROR,
  isSuccess: undefined,
  isFailure: undefined, // this field is NOT redundant
  httpStatus: undefined,
  httpStatusText: undefined,
  headers: undefined,
  code: undefined,
  message: getErrorMessage(error),
  data: undefined,
  error: error,
  errorType: getErrorType(error)
});

export const createApiReducer = (targetActionGroup) => {

  const reducer = (state = {}, action, actionType, actionPayload, actionId) => {
    switch (actionType) {
      case API_FETCHING_ACTION:
        return StateHelpers.updateField(state, actionId,
          StateHelpers.updateField(state[actionId], API_FETCHING_STATUS_FIELD, FetchingStatus.IN_PROGRESS)
        );

      case API_RESPONSE_SUCCESS_ACTION:
      case API_RESPONSE_FAILURE_ACTION:
        return StateHelpers.updateField(state, getFetchActionId(action),
          StateHelpers.update(state[getFetchActionId(action)], apiResToState(action.payload))
        );

      case API_FETCHING_ERROR_ACTION:
      case UNEXPECTED_REDUCER_ERROR_ACTION:
        return StateHelpers.updateField(state, getFetchActionId(action),
          StateHelpers.update(state[getFetchActionId(action)], apiFetchingErrorToState(action.payload))
        );

      default:
        return state;
    }
  };

  return createAppReducer(reducer, targetActionGroup);
};