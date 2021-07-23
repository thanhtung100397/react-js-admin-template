import { combineReducers } from 'redux';
import languageReducer from './ui/language/languageReducer';
import { isEmpty, collectionContain, TypeChecker } from '../utils/helpers';
import reducerLogger from './_middleware/reducer/reducerLogger';
import { ConsoleLogger } from '../utils/loggers';

const reducers = { // define all application reducers here
  ui: {
    language: languageReducer
  },
  data: {

  }
};

const createAppReducer = (reducer) => {
  return (state, action) => {
    let targetReducers = action.target?.reducers;
    if (!isEmpty(targetReducers) && !collectionContain(targetReducers, reducer)) {
      return state;
    }
    let nextState = reducer(state, action);
    if (ConsoleLogger.enable) {
      reducerLogger(reducer.name, action, state, nextState);
    }
    return nextState;
  }
};

const initAppReducer = (reducer) => {
  if (TypeChecker.isFunction(reducer)) {
    return createAppReducer(reducer);
  } else if (TypeChecker.isObject(reducer) && !TypeChecker.isEmpty(reducer)) {
    let groupReducers = {};
    Object.keys(reducer).forEach((key) => {
      let appReducer = initAppReducer(reducer[key]);
      if (appReducer) {
        groupReducers[key] = appReducer;
      }
    })
    return combineReducers(groupReducers);
  }
};

const appReducers = initAppReducer(reducers);

export default appReducers;