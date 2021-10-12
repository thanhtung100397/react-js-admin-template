import uuid from 'uuid';
import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION,
  API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION
} from '../../actionTypes';

export const createApiActions = (uniqueId) => {
  return {
    FETCH_API: (data, showNoti = true) => ({
      type: API_FETCHING_ACTION(uniqueId),
      id: uuid.v4(),
      path: uniqueId,
      showNoti: showNoti,
      payload: data
    }),

    API_RESPONSE_SUCCESS: (res, actionId) => ({
      type: API_RESPONSE_SUCCESS_ACTION(uniqueId),
      id: actionId,
      path: uniqueId,
      payload: res
    }),

    API_RESPONSE_FAILURE: (res, actionId) => ({
      type: API_RESPONSE_FAILURE_ACTION(uniqueId),
      id: actionId,
      path: uniqueId,
      payload: res
    }),

    API_FETCHING_ERROR: (error, actionId) => ({
      type: API_FETCHING_ERROR_ACTION(uniqueId),
      id: actionId,
      path: uniqueId,
      payload: error
    })
  }
};