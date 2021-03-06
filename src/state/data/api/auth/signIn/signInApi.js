import { createApiActions } from '../../../../_base/api/apiAction';
import { createApiReducer } from '../../../../_base/api/apiReducer';
import { createApiSagas } from '../../../../_base/api/apiSaga';
import { createApiHook } from '../../../../_base/api/apiHook';
import { signIn } from '../../../../../services/data/auth/signIn/signInService';

const ACTION_GROUP = 'SIGN_IN_API';

const apiCall = async (data) => {
  const { username, password, delay } = data;
  return await signIn(username, password, delay);
};

export const SignInApiActions = createApiActions(ACTION_GROUP);

export const signInApiReducer = createApiReducer(ACTION_GROUP);

export const signInApiSaga = createApiSagas(ACTION_GROUP, apiCall, SignInApiActions);

export const SignInApiHook = createApiHook(signInApiReducer, SignInApiActions);