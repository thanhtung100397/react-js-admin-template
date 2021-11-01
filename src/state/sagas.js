import { all } from 'redux-saga/effects';
import { createSagaWatcher } from './_base/appSaga';
import { TypeChecker } from '../utils/helpers';
import languageSaga from './ui/language/languageSaga';
import authSagas from './auth/authSaga';
import { signInApiSaga } from './data/api/auth/signIn/signInApi';

const sagas = [  // define all application sagas here
  languageSaga,

  authSagas,

  signInApiSaga
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
    yield createSagaWatcher(saga);
  }
}

export function* appSagas() {
  yield initAppSaga(sagas);
}
