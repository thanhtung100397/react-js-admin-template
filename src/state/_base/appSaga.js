import { takeEvery, put } from 'redux-saga/effects';
import SagaLogger from '../_middleware/saga/sagaLogger';
import { TypeChecker } from '../../utils/helpers';
import { getActionType, getActionGroup } from './appAction';

const postSagaHandler = function*(data, action, postHandler, postHandlerAction) {
  if (postHandler) {
    yield postHandler(data, action);
  }
  if (postHandlerAction) {
    let action;
    if (TypeChecker.isFunction(postHandlerAction)) {
      action = yield postHandlerAction(data, action);
    } else {
      action = postHandlerAction;
    }
    yield put(action);
  }
};

const handleOnSagaDone = function*(data, onDone, onDoneAction) {
  yield postSagaHandler(data, onDone, onDoneAction);
};

const handleOnSagaError = function*(error, onError, onErrorAction) {
  yield postSagaHandler(error, onError, onErrorAction);
};

const appSagaWrapper = ({trigger, onDone, onDoneAction, onError, onErrorAction}) => function* (action) {
  try {
    SagaLogger.info(action.type, action);
    let data = yield trigger(action);
    yield handleOnSagaDone(data, action, onDone, onDoneAction);
  } catch (err) {
    SagaLogger.error(action.type, action, err);
    yield handleOnSagaError(err, action, onError, onErrorAction)
  }
};

const checkSagaActionFunc = (targetAction) => {
  return (action) =>
    getActionType(action) === getActionType(targetAction) &&
    getActionGroup(action) === getActionGroup(targetAction);
};

const createSagaActionWatcher = (targetAction) => {
  if (TypeChecker.isObject(targetAction)) {
    return checkSagaActionFunc(targetAction);
  }
  return targetAction;
};

export function* createSagaWatcher(saga) {
  const { action, ...restSaga } = saga;
  yield takeEvery(createSagaActionWatcher(action), appSagaWrapper(restSaga));
}