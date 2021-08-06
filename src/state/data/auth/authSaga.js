import { put } from 'redux-saga/effects';
import { SIGN_IN } from '../../actionTypes';
import { signIn } from '../../../services/data/auth/authService';

export function* onSignIn(action) {
  const { username, password } = action.payload;
  let res = yield signIn(username, password);
  console.log('SAGA RES', res);
}

export const authSaga = [
  {
    action: SIGN_IN,
    trigger: onSignIn
  }
];

export default authSaga;