import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION, API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION
} from '../../actionTypes';

export const createApiActions = (uniqueId) => {
  return {
    FETCH_API: (data) => ({
      type: API_FETCHING_ACTION(uniqueId),
      payload: data
    }),

    API_RESPONSE_SUCCESS: (res) => ({
      type: API_RESPONSE_SUCCESS_ACTION(uniqueId),
      payload: res
    }),

    API_RESPONSE_FAILURE: (res) => ({
      type: API_RESPONSE_FAILURE_ACTION(uniqueId),
      payload: res
    }),

    API_FETCHING_ERROR: (error) => ({
      type: API_FETCHING_ERROR_ACTION(uniqueId),
      payload: error
    })
  }
};