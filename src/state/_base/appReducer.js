import ReducerLogger from '../_middleware/reducer/reducerLogger';
import { isInitialActionType, UNEXPECTED_REDUCER_ERROR_ACTION } from '../actionTypes';
import { checkActionGroupValid } from './appAction';

export const getStorePath = (appReducer) => {
  return appReducer.storePath;
};

export const getTargetActions = (appReducer) => {
  return appReducer.targetActions;
};

export const getReducer = (appReducer) => {
  return appReducer.reducer;
};

const reducerWrapper = (appReducer, reducer) => {
  const reducerHandler = (state, action) => {
    if (!checkActionGroupValid(action, getTargetActions(appReducer)) && !isInitialActionType()) {
      return state;
    }
    let nextState = reducer(state, action);
    ReducerLogger.info(getStorePath(appReducer), action, state, nextState);
    return nextState;
  };
  return (state, action) => {
    try {
      return reducerHandler(state, action);
    } catch (e) {
      ReducerLogger.error(getStorePath(appReducer), action, state, e);
      return reducerHandler(state, {
        ...action,
        type: UNEXPECTED_REDUCER_ERROR_ACTION,
        payload: e
      })
    }
  };
};

export class AppReducer {
  constructor(reducer, targetActions) {
    this.targetActions = targetActions;
    this.reducer = reducerWrapper(this, reducer);
  }

  setStorePath(storePath) {
    this.storePath = storePath;
  }
}

export const createAppReducer = (reducer, targetActionGroups) => {
  return new AppReducer(reducer, targetActionGroups);
};
