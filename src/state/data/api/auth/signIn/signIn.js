import { createApiActions } from '../../apiAction';
import { createApiSagas } from '../../apiSaga';
import { createApiReducer } from '../../apiReducer';
import { signIn } from '../../../../../services/data/auth/signIn/signInService';

const UNIQUE_ID = 'DATA.API.AUTH.SIGN_IN';

const apiCall = async (data) => {
  const { username, password } = data;
  return await signIn(username, password);
};

const signInAction = createApiActions(UNIQUE_ID);

const signInReducer = createApiReducer(UNIQUE_ID);

const signInSaga = createApiSagas(UNIQUE_ID, apiCall, signInAction);

export {
  signInAction,
  signInReducer,
  signInSaga
}