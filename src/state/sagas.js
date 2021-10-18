import { all } from 'redux-saga/effects';
import { createSagaWatcher } from './_base/appSaga';
import { TypeChecker } from '../utils/helpers';
import languageSaga from './ui/language/languageSaga';
import authSagas from './data/api/auth/authSaga';
import { signInSaga } from './data/api/auth/signIn/signIn'

const sagas = [  // define all application sagas here
  languageSaga,

  authSagas,

  signInSaga
];

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
    yield createSagaWatcher(saga.action, saga.trigger, saga.onError);
  }
}

export function* appSagas() {
  yield initAppSaga(sagas);
}
