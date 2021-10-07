import { combineReducers } from 'redux';
import { TypeChecker } from '../utils/helpers';
import ReducerLogger from './_middleware/reducer/reducerLogger';
import languageReducer from './ui/component/language/languageReducer';
import { signInReducer } from './data/api/auth/signIn/signIn';
import { stringJoin } from '../utils/stringHelpers';

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

const createAppReducer = ({reducer, meta}, name) => {
  return (state, action) => {
    let reducerMatcher = action.target?.reducer;
    if (meta && reducerMatcher && !reducerMatcher(meta)) {
      return state;
    }
    try {
      let nextState = reducer(state, action);
      ReducerLogger.info(name, action, state, nextState);
      return nextState;
    } catch (error) {
      ReducerLogger.error(name, action, state, error);
      return state;
    }
  }
};

const extractReducerWithMeta = (appReducer) => {
  if (TypeChecker.isFunction(appReducer)) {
    return {
      reducer: appReducer,
      meta: {}
    };
  }
  if (TypeChecker.isFunction(appReducer.reducer)) {
    return appReducer;
  }
};

const isReducerContainer = (appReducer) => {
  return TypeChecker.isObject(appReducer) && !TypeChecker.isEmpty(appReducer)
};

const initAppReducer = (appReducer, name) => {
  if (!appReducer) {
    return;
  }

  const reducerWithMeta = extractReducerWithMeta(appReducer);
  if (reducerWithMeta) {
    return createAppReducer(reducerWithMeta, name);
  }

  if (isReducerContainer(appReducer)) {
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
