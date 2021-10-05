import { all, takeEvery, call } from 'redux-saga/effects';
import { collectionContain, isEmpty, TypeChecker } from '../utils/helpers';
import SagaLogger from './_middleware/saga/sagaLogger';
import languageSaga from './ui/component/language/languageSaga';
import signInSaga from './data/api/auth/signIn/signInSaga';

const sagas = [  // define all application sagas here
  languageSaga,
  signInSaga
];

const sagaErrorHandlerWrapper = (handler, saga) => function* (action) {
  try {
    yield call(saga, action);
  } catch (err) {
    SagaLogger.error(handler.name, action, err);
  }
};

function* newSagaWatcher(actionType, handler) {
  yield takeEvery(actionType, sagaErrorHandlerWrapper(handler, function* (action) {
    let targetSagas = action.target?.sagas;
    if (!isEmpty(targetSagas) && !collectionContain(targetSagas, handler)) {
      return;
    }
    SagaLogger.info(handler.name, action);
    yield handler(action);
  }));
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
