import { createApiActions } from '../../../../_base/api/apiAction';
import { createApiSagas } from '../../../../_base/api/apiSaga';
import { createApiReducer } from '../../../../_base/api/apiReducer';
import { signIn } from '../../../../../services/data/auth/signIn/signInService';

const UNIQUE_ID = 'data.api.auth.signIn';

const apiCall = async (data) => {
  const { username, password } = data;
  return await signIn(username, password);
};

const SignInAction = createApiActions(UNIQUE_ID);

const signInReducer = createApiReducer(UNIQUE_ID);

const signInSaga = createApiSagas(UNIQUE_ID, apiCall, SignInAction);

export {
  SignInAction,
  signInReducer,
  signInSaga
}