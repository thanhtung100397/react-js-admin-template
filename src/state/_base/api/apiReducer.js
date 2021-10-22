import {
  getCode, getData, getHeaders, getHttpStatus, getMessage, isSuccess, getErrorMessage, getErrorType, getHttpStatusText
} from '../../../services/apiHelpers';
import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION, API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION,
  UNEXPECTED_REDUCER_ERROR_ACTION
} from '../../actionTypes';
import { updateState, updateStateField } from '../../stateHelpers';
import { getActionId } from '../appAction';
import { getFetchActionId } from './apiAction';

export const FETCHING_STATUS_FIELD = 'fetchingStatus';

export const FetchingStatus = {
  IDLE: 'IDLE',
  IN_PROGRESS: 'IN_PROGRESS',
  ERROR: 'ERROR',
};

export const apiResToState = (res) => {
  const success = isSuccess(res);
  return {
    [FETCHING_STATUS_FIELD]: FetchingStatus.IDLE,
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
  [FETCHING_STATUS_FIELD]: FetchingStatus.ERROR,
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

export const createApiReducer = () => {

  const reducerHandler = {
    [API_FETCHING_ACTION]: (state, action) =>
      updateStateField(state, getActionId(action),
        updateStateField(state[getActionId(action)], FETCHING_STATUS_FIELD, FetchingStatus.IN_PROGRESS)
      ),
    [API_RESPONSE_SUCCESS_ACTION]: (state, action) =>
      updateStateField(state, getFetchActionId(action),
        updateState(state[getFetchActionId(action)], apiResToState(action.payload))
      ),
    [API_RESPONSE_FAILURE_ACTION]: (state, action) =>
      updateStateField(state, getFetchActionId(action),
        updateState(state[getFetchActionId(action)], apiResToState(action.payload))
      ),
    [API_FETCHING_ERROR_ACTION]: (state, action) =>
      updateStateField(state, getFetchActionId(action),
        updateState(state[getFetchActionId(action)], apiFetchingErrorToState(action.payload))
      ),
    [UNEXPECTED_REDUCER_ERROR_ACTION]: (state, action) =>
      updateStateField(state, getFetchActionId(action),
        updateState(state[getFetchActionId(action)], apiFetchingErrorToState(action.payload))
      ),
  };

  return (state = {}, action) => {
    const handler = reducerHandler[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
};