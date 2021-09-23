import { put } from 'redux-saga/effects';
import { SIGN_IN } from '../../../actionTypes';
import { signIn } from '../../../../services/data/auth/signIn/signInService';

export function* onSignIn(action) {
  const { username, password } = action.payload;
  let res = yield signIn(username, password);
  console.log('ON SIGN IN', res);
}

export const signInSaga = [
  {
    action: SIGN_IN,
    trigger: onSignIn
  }
];

export default signInSaga;
