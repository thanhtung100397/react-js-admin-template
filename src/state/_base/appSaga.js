import { takeEvery } from 'redux-saga/effects';
import SagaLogger from '../_middleware/saga/sagaLogger';
import { TypeChecker } from '../../utils/helpers';

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

const actionWatcher = (targetAction) => {
  if (TypeChecker.isObject(targetAction)) {
    return (action) => {
      return action.type = targetAction.type && action.id === targetAction.id
    };
  }
  return targetAction;
};

export function* createSagaWatcher(action, handler, errorHandler) {
  yield takeEvery(actionWatcher(action), appSagaWrapper(handler, errorHandler));
}