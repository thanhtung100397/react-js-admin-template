import { combineReducers } from 'redux';
import { TypeChecker } from '../utils/helpers';
import ReducerLogger from './_middleware/reducer/reducerLogger';
import { stringJoin } from '../utils/stringHelpers';
import languageReducer from './ui/language/languageReducer';
import { signInReducer } from './data/api/auth/signIn/signIn';
import { UNEXPECTED_REDUCER_ERROR_ACTION } from './actionTypes';

const reducers = { // define all application reducers here
  ui: {
    language: languageReducer,
  },
  data: {
    api: {
      auth: {
        signIn: signInReducer
      }
    }
  }
};

const createAppReducer = (reducer, name) => {
  return function reducerWrapper(state, action) {
    try {
      let nextState = reducer(state, action);
      if (nextState !== state) {
        ReducerLogger.info(name, action, state, nextState);
      }
      return nextState;
    } catch (error) {
      ReducerLogger.error(name, action, state, error);
      return reducerWrapper(state, {
        ...action,
        type: UNEXPECTED_REDUCER_ERROR_ACTION,
        payload: error
      });
    }
  }
};

const isReducerContainer = (appReducer) => {
  return TypeChecker.isObject(appReducer) && !TypeChecker.isEmpty(appReducer)
};

const initAppReducer = (appReducer, name) => {
  if (!appReducer) {
    return;
  }

  if (TypeChecker.isFunction(appReducer)) {
    return createAppReducer(appReducer, name);
  } else if (isReducerContainer(appReducer)) {
    let groupReducers = {};
    Object.keys(appReducer).forEach((key) => {
      let reducer = initAppReducer(appReducer[key], stringJoin('.', name, key));
      if (reducer) {
        groupReducers[key] = reducer;
      }
    });
    return combineReducers(groupReducers);
  }
};

const appReducers = initAppReducer(reducers);

export default appReducers;
