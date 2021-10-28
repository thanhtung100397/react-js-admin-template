import { createAppActions } from '../../../_base/appAction';
import { USER_SIGN_IN_ACTION, USER_SIGN_OUT_ACTION } from '../../../actionTypes';

export const ACTION_GROUP = 'USER_SIGN_IN';

const actions = {
  USER_SIGN_IN_ACTION: (authInfo) => ({
    type: USER_SIGN_IN_ACTION,
    payload: authInfo
  }),
  USER_SIGN_OUT_ACTION: () => ({
    type: USER_SIGN_OUT_ACTION,
  })
};

export const AuthActions = createAppActions(actions, ACTION_GROUP);