import { SAVE_USER_AUTH_INFO_ACTION, DELETE_USER_AUTH_INFO_ACTION } from '../../../actionTypes';
import { saveAuthInfo, deleteAuthInfo } from '../../../../services/data/auth/authService';

function* saveUserAuthInfo(action) {
  yield saveAuthInfo(action.payload);
}

function* deleteUserAuthInfo(action) {
  yield deleteAuthInfo();
}

const authSagas = [
  {
    action: SAVE_USER_AUTH_INFO_ACTION,
    trigger: saveUserAuthInfo
  },
  {
    action: DELETE_USER_AUTH_INFO_ACTION,
    trigger: deleteUserAuthInfo
  }
];

export default authSagas;