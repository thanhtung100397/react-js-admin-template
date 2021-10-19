import { takeEvery } from 'redux-saga/effects';
import SagaLogger from '../_middleware/saga/sagaLogger';

const appSagaWrapper = (handler, errorHandler) => function* (action) {
  try {
    SagaLogger.info(action.type, action);
    yield handler(action);
  } catch (err) {
    SagaLogger.error(action.type, action, err);
    if (errorHandler) {
      yield errorHandler(err, action);
    }
  }
};

export function* createSagaWatcher(actionType, handler, errorHandler) {
  yield takeEvery(actionType, appSagaWrapper(handler, errorHandler));
}