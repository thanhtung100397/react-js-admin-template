import { takeEvery } from 'redux-saga/effects';
import SagaLogger from '../_middleware/saga/sagaLogger';
import { TypeChecker } from '../../utils/helpers';
import { getActionStorePath, getActionType } from './appAction';

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

const checkSagaActionFunc = (targetAction) => {
  return (action) =>
    getActionType(action) === getActionType(targetAction) &&
    getActionStorePath(action) === getActionStorePath(targetAction);
};

const createSagaActionWatcher = (targetAction) => {
  if (TypeChecker.isObject(targetAction)) {
    return checkSagaActionFunc(targetAction);
  }
  return targetAction;
};

export function* createSagaWatcher(targetAction, handler, errorHandler) {
  yield takeEvery(createSagaActionWatcher(targetAction), appSagaWrapper(handler, errorHandler));
}