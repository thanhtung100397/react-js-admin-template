
export const isInitialActionType = (type) => {
  return type.startsWith('@@redux');
};

const actionPrefixFormat = (prefix) => `${prefix}.`;

// global action
export const UNEXPECTED_REDUCER_ERROR_ACTION = 'UNEXPECTED_REDUCER_ERROR_ACTION';

// ui actions
export const CHANGE_LANGUAGE_ACTION = `${actionPrefixFormat('UI.LANGUAGE')}CHANGE_LANGUAGE_ACTION`;

// auth action
export const SAVE_USER_AUTH_INFO_ACTION = 'SAVE_USER_AUTH_INFO_ACTION';
export const DELETE_USER_AUTH_INFO_ACTION = 'DELETE_USER_AUTH_INFO_ACTION';

// api actions
export const API_FETCHING_ACTION = (prefix) => `${actionPrefixFormat(prefix)}API_FETCH_ACTION`;
export const API_RESPONSE_SUCCESS_ACTION = (prefix) => `${actionPrefixFormat(prefix)}API_RESPONSE_SUCCESS_ACTION`;
export const API_RESPONSE_FAILURE_ACTION = (prefix) => `${actionPrefixFormat(prefix)}API_RESPONSE_FAILURE_ACTION`;
export const API_FETCHING_ERROR_ACTION = (prefix) => `${actionPrefixFormat(prefix)}API_FETCHING_ERROR_ACTION`;