
export const isInitialActionType = (type) => {
  return type.startsWith('@@redux');
};

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';