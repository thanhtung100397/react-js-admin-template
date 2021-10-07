import { createApiActions } from '../../apiAction';
import { createApiSagas } from '../../apiSaga';
import { createApiReducer } from '../../apiReducer';
import { SIGN_IN } from '../../../../actionTypes';
import { signIn } from '../../../../../services/data/auth/signIn/signInService';

const UNIQUE_ID = 'SIGN_IN';

const apiCall = async ({body, headers, params}) => {
  const { username, password } = body;
  return await signIn(username, password);
};

const signInReducer = createApiReducer(UNIQUE_ID);

const signInAction = createApiActions(UNIQUE_ID, signInReducer);

const signInSaga = createApiSagas(UNIQUE_ID, apiCall, signInAction);

export {
  signInAction,
  signInReducer,
  signInSaga
}