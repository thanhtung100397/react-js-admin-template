import { getCode, getData, getHeaders, getHttpStatus, getMessage, isSuccess } from '../../../services/apiHelpers';
import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION, API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION
} from '../../actionTypes';
import { updateState, updateStateField } from '../../stateHelpers';

export const FETCHING_FLAG_FIELD = 'fetchingState';

export const FetchingState = {
  IDLE: 'IDLE',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
};

export const BASE_API_DATA_STATE = {
  [FETCHING_FLAG_FIELD]: FetchingState.IDLE,
  isSuccess: undefined,
  httpStatus: undefined,
  headers: undefined,
  code: undefined,
  msg: undefined,
  data: undefined,
  error: undefined
};

export const apiResToState = (res) => ({
  [FETCHING_FLAG_FIELD]: FetchingState.COMPLETED,
  isSuccess: isSuccess(res),
  httpStatus: getHttpStatus(res),
  headers: getHeaders(res),
  code: getCode(res),
  msg: getMessage(res),
  data: getData(res),
  error: undefined
});

export const apiFetchingErrorToState = (error) => ({
  [FETCHING_FLAG_FIELD]: FetchingState.ERROR,
  isSuccess: false,
  httpStatus: undefined,
  headers: undefined,
  code: undefined,
  msg: undefined,
  data: undefined,
  error: error
});

export const createApiReducer = (uniqueId) => {

  const defaultState = {
    ...BASE_API_DATA_STATE
  };

  const reducerHandler = {
    [API_FETCHING_ACTION(uniqueId)]: (state, action) => updateStateField(state, FETCHING_FLAG_FIELD, FetchingState.IN_PROGRESS),
    [API_RESPONSE_SUCCESS_ACTION(uniqueId)]: (state, action) => updateState(state, apiResToState(action.payload)),
    [API_RESPONSE_FAILURE_ACTION(uniqueId)]: (state, action) => updateState(state, apiResToState(action.payload)),
    [API_FETCHING_ERROR_ACTION(uniqueId)]: (state, action) => updateState(state, apiFetchingErrorToState(action.payload))
  };

  return (state = defaultState, action) => {
    const handler = reducerHandler[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
};