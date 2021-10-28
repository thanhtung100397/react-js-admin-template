import { USER_SIGN_IN_ACTION, USER_SIGN_OUT_ACTION } from '../../../actionTypes';
import { saveAuthInfo, deleteAuthInfo } from '../../../../services/data/auth/authService';
import { ACTION_GROUP } from './authAction';

function* saveUserAuthInfo(action) {
  yield saveAuthInfo(action.payload);
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
    trigger: saveUserAuthInfo
  },
  {
    action: {
      type: USER_SIGN_OUT_ACTION,
      group: ACTION_GROUP
    },
    trigger: deleteUserAuthInfo
  }
];

export default authSagas;