import { all, takeEvery } from 'redux-saga/effects';
import { TypeChecker } from '../utils/helpers';
import SagaLogger from './_middleware/saga/sagaLogger';
import languageSaga from './ui/language/languageSaga';
import { signInSaga } from './data/api/auth/signIn/signIn';

const sagas = [  // define all application sagas here
  languageSaga,
  signInSaga
];

const sagaHandlerWrapper = (handler, errorHandler) => function* (action) {
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

function* newSagaWatcher(actionType, handler, errorHandler) {
  yield takeEvery(actionType, sagaHandlerWrapper(handler, errorHandler));
}

function* initAppSaga(saga) {
  if (TypeChecker.isArray(saga)) {
    let childSagas = [];
    for (let childSaga of saga) {
      if (childSaga) {
        childSagas.push(initAppSaga(childSaga));
      }
    }
    yield all(childSagas);
  } else if (TypeChecker.isObject(saga)) {
    yield newSagaWatcher(saga.action, saga.trigger, saga.onError);
  }
}

export function* appSagas() {
  yield initAppSaga(sagas);
}
