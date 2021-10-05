import { combineReducers } from 'redux';
import { isEmpty, collectionContain, TypeChecker } from '../utils/helpers';
import ReducerLogger from './_middleware/reducer/reducerLogger';
import languageReducer from './ui/component/language/languageReducer';
import authReducers from './data/api/auth/signIn/signInReducer';

const reducers = { // define all application reducers here
  ui: {
    language: languageReducer,
    page: {

    }
  },
  data: {
    api: {
      auth: authReducers
    }
  }
};

const createAppReducer = (reducer) => {
  return (state, action) => {
    let targetReducers = action.target?.reducers;
    if (!isEmpty(targetReducers) && !collectionContain(targetReducers, reducer)) {
      return state;
    }
    try {
      let nextState = reducer(state, action);
      ReducerLogger.info(reducer.name, action, state, nextState);
      return nextState;
    } catch (error) {
      ReducerLogger.error(reducer.name, action, state, error);
      return state;
    }
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
    });
    return combineReducers(groupReducers);
  }
};

const appReducers = initAppReducer(reducers);

export default appReducers;
