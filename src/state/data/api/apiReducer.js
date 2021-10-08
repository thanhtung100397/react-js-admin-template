import { getCode, getData, getHeaders, getHttpStatus, getMessage, isSuccess } from '../../../services/apiHelpers';
import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION, API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION
} from '../../actionTypes';
import { updateState, updateStateField } from '../../stateHelpers';

export const FETCHING_STATUS_FIELD = 'fetchingStatus';

export const FetchingStatus = {
  IDLE: 'IDLE',
  IN_PROGRESS: 'IN_PROGRESS',
  ERROR: 'ERROR',
};

export const apiResToState = (res) => ({
  [FETCHING_STATUS_FIELD]: FetchingStatus.IDLE,
  isSuccess: isSuccess(res),
  httpStatus: getHttpStatus(res),
  headers: getHeaders(res),
  code: getCode(res),
  msg: getMessage(res),
  data: getData(res),
  error: undefined
});

export const apiFetchingErrorToState = (error) => ({
  [FETCHING_STATUS_FIELD]: FetchingStatus.ERROR,
  isSuccess: false,
  httpStatus: undefined,
  headers: undefined,
  code: undefined,
  msg: undefined,
  data: undefined,
  error: error
});

export const createApiReducer = (uniqueId) => {

  const reducerHandler = {
    [API_FETCHING_ACTION(uniqueId)]: (state, action) =>
      updateStateField(state, action.id,
        updateStateField(state[action.id], FETCHING_STATUS_FIELD, FetchingStatus.IN_PROGRESS)
      ),
    [API_RESPONSE_SUCCESS_ACTION(uniqueId)]: (state, action) =>
      updateStateField(state, action.id,
        updateState(state[action.id], apiResToState(action.payload))
      ),
    [API_RESPONSE_FAILURE_ACTION(uniqueId)]: (state, action) =>
      updateStateField(state, action.id,
        updateState(state[action.id], apiResToState(action.payload))
      ),
    [API_FETCHING_ERROR_ACTION(uniqueId)]: (state, action) =>
      updateStateField(state, action.id,
        updateState(state[action.id], apiFetchingErrorToState(action.payload))
      )
  };

  return (state = {}, action) => {
    const handler = reducerHandler[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
};