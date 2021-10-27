import { createApiActions } from '../../../../_base/api/apiAction';
import { createApiReducer } from '../../../../_base/api/apiReducer';
import { createApiSagas } from '../../../../_base/api/apiSaga';
import { signIn } from '../../../../../services/data/auth/signIn/signInService';

const ACTION_GROUP = 'SIGN_IN_API';

const apiCall = async (data) => {
  const { username, password, delay } = data;
  return await signIn(username, password, delay);
};

export const SignInActions = createApiActions(ACTION_GROUP);

export const signInReducer = createApiReducer();

export const signInSaga = createApiSagas(ACTION_GROUP, apiCall, SignInActions);