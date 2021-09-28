import { put } from 'redux-saga/effects';
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../../../actionTypes';
import { signIn } from '../../../../services/data/auth/signIn/signInService';

export function* onSignIn(action) {
  const { username, password } = action.payload;
  const res = yield signIn(username, password);

  yield put({
    type: SIGN_IN_SUCCESS,
    payload: {
      name: 'abc'
    }
  })
}

export const signInSaga = [
  {
    action: SIGN_IN,
    trigger: onSignIn
  }
];

export default signInSaga;
