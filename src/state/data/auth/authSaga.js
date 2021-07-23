import { call, put } from 'redux-saga/effects';
import { SIGN_IN } from '../../actionTypes';

export function* onSignIn(action) {

}

export const signInSaga = [
  {
    action: SIGN_IN,
    trigger: onSignIn
  }
]