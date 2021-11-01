import { createAppReducer } from '../../_base/appReducer';
import { ACTION_GROUP } from '../authAction';
import { USER_SIGN_IN_SUCCESS_ACTION, USER_SIGN_OUT_SUCCESS_ACTION } from '../../actionTypes';
import { getAuthInfo, isAuth } from '../../../services/data/auth/authService';
import { StateHelpers } from '../../../utils/stateHelpers';

export const TARGET_ACTION_GROUPS = [ACTION_GROUP];

const DEFAULT_STATE = {
  isAuth: isAuth(),
  ...getAuthInfo()
};

const reducer = (state = DEFAULT_STATE, action, actionType, actionPayload) => {
  switch (actionType) {
    case USER_SIGN_IN_SUCCESS_ACTION:
      return StateHelpers.update(state, {
        isAuth: true,
        ...actionPayload
      });

    case USER_SIGN_OUT_SUCCESS_ACTION:
      return {
        isAuth: false
      };

    default:
      return state;
  }
};

export const authInfoReducer = createAppReducer(reducer, TARGET_ACTION_GROUPS);