import { all, takeEvery } from 'redux-saga/effects';
import { collectionContain, isEmpty, TypeChecker } from '../utils/helpers';
import { ConsoleLogger } from '../utils/loggers';
import sagaLogger from './_middleware/saga/sagaLogger';
import { languageSaga } from './ui/language/languageSaga';
import { signInSaga } from './data/auth/authSaga';

const sagas = [  // define all application sagas here
  languageSaga,
  signInSaga
];

function* newSagaWatcher(actionType, handler) {
  yield takeEvery(actionType, function* (action) {
    let targetSagas = action.target?.sagas;
    if (!isEmpty(targetSagas) && !collectionContain(targetSagas, handler)) {
      return;
    }
    yield handler(action);
    if (ConsoleLogger.enable) {
      sagaLogger(handler.name, action);
    }
  })
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
    yield newSagaWatcher(saga.action, saga.trigger);
  }
}

export function* appSagas() {
  yield initAppSaga(sagas);
}