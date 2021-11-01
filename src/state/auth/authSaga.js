import { USER_SIGN_IN_ACTION, USER_SIGN_OUT_ACTION } from '../actionTypes';
import { saveAuthInfo, deleteAuthInfo } from '../../services/data/auth/authService';
import { ACTION_GROUP, AuthActions } from './authAction';

function* saveUserAuthInfo(action) {
  return yield saveAuthInfo(action.payload);
}

function* deleteUserAuthInfo(action) {
  yield deleteAuthInfo();
}

const authSagas = [
  {
    action: {
      type: USER_SIGN_IN_ACTION,
      group: ACTION_GROUP
    },
    trigger: saveUserAuthInfo,
    onDoneAction: (data) => AuthActions.USER_SIGN_IN_SUCCESS_ACTION(data),
    onErrorAction: (error) => AuthActions.USER_SIGN_IN_FAILURE_ACTION(error),
  },
  {
    action: {
      type: USER_SIGN_OUT_ACTION,
      group: ACTION_GROUP
    },
    trigger: deleteUserAuthInfo,
    onDoneAction: AuthActions.USER_SIGN_OUT_SUCCESS_ACTION(),
    onErrorAction: (error) => AuthActions.USER_SIGN_OUT_FAILURE_ACTION(error),
  }
];

export default authSagas;