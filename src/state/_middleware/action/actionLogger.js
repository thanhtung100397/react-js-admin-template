
export const dispatchActionLogger = (store) => (next) => (action) => {
  console.log(`[DISPATCH ACTION] ${action.type}`, action);
  return next(action);
};