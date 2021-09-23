import { SIGN_IN } from '../../../actionTypes';
import { newSet } from '../../../../utils/helpers';
import signInReducers from './signInReducer';
import { onSignIn } from './signInSaga';

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
