import { combineReducers } from 'redux';
import { createAppReducer } from './_base/appReducer';
import { TypeChecker } from '../utils/helpers';
import { stringJoin } from '../utils/stringHelpers';
import languageReducer from './ui/language/languageReducer';
import { signInReducer } from './data/api/auth/signIn/signIn';

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

const isReducerContainer = (reducer) => {
  return TypeChecker.isObject(reducer) && !TypeChecker.isEmpty(reducer)
};

const initAppReducer = (reducer, storePath) => {
  if (TypeChecker.isFunction(reducer)) {
    return createAppReducer(reducer, storePath);
  } else if (isReducerContainer(reducer)) {
    let groupReducers = {};
    Object.keys(reducer).forEach((key) => {
      const reducerStorePath = stringJoin('.', storePath, key);
      const appReducer = initAppReducer(reducer[key], reducerStorePath);
      if (appReducer) {
        groupReducers[key] = appReducer;
      }
    });
    return combineReducers(groupReducers);
  }
};

const appReducers = initAppReducer(reducers);

export default appReducers;
