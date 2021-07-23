
export const isInitialActionType = (type) => {
  return type.startsWith('@@redux');
};

// ui actions
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

// data actions
export const SIGN_IN = 'SIGN_IN';