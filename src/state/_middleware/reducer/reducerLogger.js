import { isInitialActionType } from '../../actionTypes';

const reducerLogger = (reducerId, action, prevState, nextState) => {
  if (isInitialActionType(action.type)) {
    return;
  }
  console.log(`[REDUCER TRIGGERED] ${reducerId}`, {
    action: action,
    prevState: prevState,
    nextState: nextState
  });
};

export default reducerLogger;