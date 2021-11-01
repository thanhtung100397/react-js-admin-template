import { createAppActions } from '../_base/appAction';
import {
  USER_SIGN_IN_ACTION, USER_SIGN_IN_SUCCESS_ACTION, USER_SIGN_IN_FAILURE_ACTION,
  USER_SIGN_OUT_ACTION, USER_SIGN_OUT_SUCCESS_ACTION, USER_SIGN_OUT_FAILURE_ACTION
} from '../actionTypes';

export const ACTION_GROUP = 'USER_AUTH';

const actions = {
  USER_SIGN_IN_ACTION: ({accessToken, refreshToken}) => ({
    type: USER_SIGN_IN_ACTION,
    payload: {
      accessToken,
      refreshToken
    }
  }),

  USER_SIGN_IN_SUCCESS_ACTION: ({accessToken, refreshToken}) => ({
    type: USER_SIGN_IN_SUCCESS_ACTION,
    payload: {
      accessToken,
      refreshToken
    }
  }),

  USER_SIGN_IN_FAILURE_ACTION: (error) => ({
    type: USER_SIGN_IN_FAILURE_ACTION,
    payload: error
  }),

  USER_SIGN_OUT_ACTION: () => ({
    type: USER_SIGN_OUT_ACTION
  }),

  USER_SIGN_OUT_SUCCESS_ACTION: () => ({
    type: USER_SIGN_OUT_SUCCESS_ACTION
  }),

  USER_SIGN_OUT_FAILURE_ACTION: (error) => ({
    type: USER_SIGN_OUT_FAILURE_ACTION,
    payload: error
  }),
};

export const AuthActions = createAppActions(actions, ACTION_GROUP);