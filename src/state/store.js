import { createStore, applyMiddleware } from 'redux';
import appReducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import { appSagas } from './sagas';
import { ConsoleLogger } from '../utils/loggers';
import { dispatchActionLogger } from './_middleware/action/actionLogger';

const sagaMiddleware = createSagaMiddleware();

const initMiddlewares = () => {
  let middlewares = [
    sagaMiddleware
  ];
  if (ConsoleLogger.enable) {
    middlewares.push(dispatchActionLogger);
  }
  return middlewares;
}

const store = createStore(
  appReducers,
  applyMiddleware(...initMiddlewares())
);

sagaMiddleware.run(appSagas);

export default store;