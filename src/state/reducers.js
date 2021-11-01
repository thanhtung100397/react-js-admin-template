import { combineReducers } from 'redux';
import { AppReducer, createAppReducer, getReducer } from './_base/appReducer';
import { TypeChecker } from '../utils/helpers';
import { stringJoin } from '../utils/stringHelpers';
import languageReducer from './ui/language/languageReducer';
import { signInApiReducer } from './data/api/auth/signIn/signInApi';
import { authInfoReducer } from './auth/info/authInfoReducer';

const reducers = { // define all application reducers here
  ui: {
    language: languageReducer,
  },
  auth: {
    info: authInfoReducer
  },
  data: {
    api: {
      auth: {
        signIn: signInApiReducer
      }
    }
  }
};

const isReducerContainer = (reducer) => {
  return TypeChecker.isObject(reducer) && !TypeChecker.isEmpty(reducer)
};

const initReducerFromAppReducer = (appReducer, storePath) => {
  appReducer.setStorePath(storePath);
  return getReducer(appReducer);
};

const initReducerFromReducerFunction = (reducerFunc, storePath) => {
  const appReducer = createAppReducer(reducerFunc);
  appReducer.setStorePath(storePath);
  return getReducer(appReducer);
};

const initAppReducer = (reducer, storePath) => {
  if (reducer instanceof AppReducer) {
    return initReducerFromAppReducer(reducer, storePath);
  } else if (TypeChecker.isFunction(reducer)) {
    return initReducerFromReducerFunction(reducer, storePath);
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
