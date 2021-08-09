import { isInitialActionType } from '../../actionTypes';
import { ConsoleLogger } from '../../../utils/loggers';

const ReducerLogger = {
  info: (reducerId, action, prevState, nextState) => {
    if (isInitialActionType(action.type)) {
      return;
    }
    ConsoleLogger.info(`[REDUCER TRIGGERED] ${reducerId}`, {
      action: action,
      prevState: prevState,
      nextState: nextState
    });
  },
  error: (reducerId, action, prevState, error) => {
    ConsoleLogger.error(`[REDUCER ERROR] ${reducerId}`, {
      action: action,
      prevState: prevState,
      error: error
    });
  }
};

export default ReducerLogger;
