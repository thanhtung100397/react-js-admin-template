import { combineReducers } from 'redux';
import { AppReducer, createAppReducer, getReducer } from './_base/appReducer';
import { TypeChecker } from '../utils/helpers';
import { stringJoin } from '../utils/stringHelpers';
import languageReducer from './ui/language/languageReducer';
import signInReducer from './data/api/auth/signIn/signInReducer';

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

const initReducerFromAppReducer = (appReducer) => {
  appReducer.setStorePath(storePath);
  return getReducer(reducer);
};

const initReducerFromReducerFunction = (reducerFunc) => {
  const appReducer = createAppReducer(reducerFunc);
  appReducer.setStorePath(storePath);
  return getReducer(appReducer);
};

const initAppReducer = (reducer, storePath) => {
  if (reducer instanceof AppReducer) {
    return initReducerFromAppReducer(reducer);
  } else if (TypeChecker.isFunction(reducer)) {
    return initReducerFromReducerFunction(reducer);
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
