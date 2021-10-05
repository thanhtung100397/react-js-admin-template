import { put } from 'redux-saga/effects';
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../../../../actionTypes';
import { signIn } from '../../../../../services/data/auth/signIn/signInService';
import { isSuccess } from '../../../../../services/apiHelpers';

export function* onSignIn(action) {
  const { username, password } = action.payload;
  const res = yield signIn(username, password);
  if (isSuccess(res)) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: res
    });
  } else {
    yield put({
      type: SIGN_IN_FAILURE,
      payload: res
    });
  }
}

export function* onSignInSuccess(action) {

}

export function* onSignInFailure(action) {

}

export const signInSaga = [
  {
    action: SIGN_IN,
    trigger: onSignIn
  }
];

export default signInSaga;
