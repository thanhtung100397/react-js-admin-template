import { createStore, applyMiddleware } from 'redux';
import appReducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import { appSagas } from './sagas';
import { actionLogger } from './_middleware/action/actionLogger';

const sagaMiddleware = createSagaMiddleware();

const initMiddlewares = () => {
  let middlewares = [
    sagaMiddleware
  ];
  middlewares.push(actionLogger);
  return middlewares;
};

const store = createStore(
  appReducers,
  applyMiddleware(...initMiddlewares())
);

sagaMiddleware.run(appSagas);

export default store;
