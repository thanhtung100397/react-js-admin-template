import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../../../../actionTypes';
import { newSet } from '../../../../../utils/helpers';
import { onSignIn } from './signInSaga';
import signInReducers from './signInReducer';

export const signInAction = (username, password) => ({
  type: SIGN_IN,
  target: {
    reducers: newSet(
      signInReducers
    ),
    sagas: newSet(
      onSignIn
    )
  },
  payload: {
    username: username,
    password: password,
  }
});

export const signInSuccessAction = (apiRes) => ({
  type: SIGN_IN_SUCCESS,
  target: {
    reducers: newSet(
     signInReducers
    )
  },
  payload: apiRes
});

export const signInFailureAction = (apiRes) => ({
  type: SIGN_IN_FAILURE,
  target: {
    reducers: newSet(
      signInReducers
    )
  },
  payload: apiRes
});

