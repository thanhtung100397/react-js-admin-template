import { SIGN_IN } from '../../actionTypes';
import { newSet } from '../../../utils/helpers';

export const signInAction = (username, password) => ({
  type: SIGN_IN,
  target: {
    reducers: newSet(),
    sagas: newSet()
  },
  payload: {
    username: username,
    password: password,
  }
});