
export const isInitialActionType = (type) => {
  return type.startsWith('@@redux');
};

// ui actions
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

// data actions
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';