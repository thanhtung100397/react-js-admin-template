import { createAppReducer } from '../../_base/appReducer';
import { ACTION_GROUP } from '../authAction';
import { USER_SIGN_IN_SUCCESS_ACTION } from '../../actionTypes';
import { getAuthInfo } from '../../../services/data/auth/authService';
import { StateHelpers } from '../../../utils/stateHelpers';

const DEFAULT_STATE = {
  ...getAuthInfo()
};

const reducer = (state = DEFAULT_STATE, action, actionType, actionPayload) => {
  switch (actionType) {
    case USER_SIGN_IN_SUCCESS_ACTION:
      return StateHelpers.update(state, actionPayload);

    default:
      return state;
  }
};

export const authInfoReducer = createAppReducer(reducer, ACTION_GROUP);