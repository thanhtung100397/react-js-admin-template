import ReducerLogger from '../_middleware/reducer/reducerLogger';
import { isInitialActionType, UNEXPECTED_REDUCER_ERROR_ACTION } from '../actionTypes';
import { checkActionGroupValid } from './appAction';

const appReducer = (reducer, storePath, targetActionGroups) => {
  const targetActionGroupsSet = targetActionGroups? new Set(targetActionGroups) : undefined;
  return (state, action) => {
    if (!checkActionGroupValid(action, targetActionGroupsSet) && !isInitialActionType()) {
      return state;
    }
    let nextState = reducer(state, action);
    ReducerLogger.info(storePath, action, state, nextState);
    return nextState;
  }
};

const appReducerWrapper = (appReducer, storePath) => {
  return (state, action) => {
    try {
      return appReducer(state, action);
    } catch (e) {
      ReducerLogger.error(storePath, action, state, e);
      return appReducer(state, {
        ...action,
        type: UNEXPECTED_REDUCER_ERROR_ACTION,
        payload: e
      })
    }
  }
};

export const createAppReducer = (reducer, storePath, targetActionGroups) => {
  return appReducerWrapper(appReducer(reducer, storePath, targetActionGroups), storePath);
};
