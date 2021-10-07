import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION, API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION
} from '../../actionTypes';

export const createApiActions = (uniqueId, apiReducer) => {
  return {
    FETCH_API: ({body, headers, params}) => ({
      type: API_FETCHING_ACTION(uniqueId),
      target: {
        reducer: (meta) => meta.id === apiReducer.meta.id
      },
      payload: {
        body: body,
        headers: headers,
        params: params,
      }
    }),

    API_RESPONSE_SUCCESS: (res) => ({
      type: API_RESPONSE_SUCCESS_ACTION(uniqueId),
      target: {
        reducer: (meta) => meta.id === apiReducer.meta.id
      },
      payload: res
    }),

    API_RESPONSE_FAILURE: (res) => ({
      type: API_RESPONSE_FAILURE_ACTION(uniqueId),
      target: {
        reducer: (meta) => meta.id === apiReducer.meta.id
      },
      payload: res
    }),

    API_FETCHING_ERROR: (error) => ({
      type: API_FETCHING_ERROR_ACTION(uniqueId),
      target: {
        reducer: (meta) => meta.id === apiReducer.meta.id
      },
      payload: error
    })
  }
};