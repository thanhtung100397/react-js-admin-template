
export const isInitialActionType = (type) => {
  return type.startsWith('@@redux');
};

// global action
export const UNEXPECTED_REDUCER_ERROR_ACTION = 'UNEXPECTED_REDUCER_ERROR_ACTION';

// ui actions
export const CHANGE_LANGUAGE_ACTION = 'CHANGE_LANGUAGE_ACTION';

// auth action
export const USER_SIGN_IN_ACTION = 'USER_SIGN_IN_ACTION';
export const USER_SIGN_OUT_ACTION = 'USER_SIGN_OUT_ACTION';

// api actions
export const API_FETCHING_ACTION = 'API_FETCH_ACTION';
export const API_RESPONSE_SUCCESS_ACTION = 'API_RESPONSE_SUCCESS_ACTION';
export const API_RESPONSE_FAILURE_ACTION = 'API_RESPONSE_FAILURE_ACTION';
export const API_FETCHING_ERROR_ACTION = 'API_FETCHING_ERROR_ACTION';