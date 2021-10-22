import { createApiSagas } from '../../../../_base/api/apiSaga';
import { SignInAction } from './signInAction';
import { signIn } from '../../../../../services/data/auth/signIn/signInService';

const apiCall = async (data) => {
  const { username, password } = data;
  return await signIn(username, password);
};

const signInSaga = createApiSagas(UNIQUE_ID, apiCall, SignInAction);

export default signInSaga;