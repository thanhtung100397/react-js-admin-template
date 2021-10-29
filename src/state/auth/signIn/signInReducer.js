import { baseActionState, createAppReducer } from '../../_base/appReducer';
import { ACTION_GROUP } from '../authAction';
import {
  ActionStatus,
  UNEXPECTED_REDUCER_ERROR_ACTION, USER_SIGN_IN_ACTION,
  USER_SIGN_IN_FAILURE_ACTION, USER_SIGN_IN_SUCCESS_ACTION
} from '../../actionTypes';
import { StateHelpers } from '../../../utils/stateHelpers';

export const reducer = (state = {}, action, actionType, actionPayload, actionId) => {
  switch (actionType) {
    case USER_SIGN_IN_ACTION:
      return StateHelpers.updateField(state, actionId,
        StateHelpers.update(state[actionId], baseActionState(ActionStatus.IN_PROGRESS))
      );

    case USER_SIGN_IN_SUCCESS_ACTION:
      return StateHelpers.updateField(state, actionId,
        StateHelpers.update(state[actionId], baseActionState(ActionStatus.SUCCESS, actionPayload))
      );

    case USER_SIGN_IN_FAILURE_ACTION:
    case UNEXPECTED_REDUCER_ERROR_ACTION:
      return StateHelpers.updateField(state, actionId,
        StateHelpers.update(state[actionId], baseActionState(ActionStatus.FAILURE, undefined, actionPayload))
      );

    default:
      return state;
  }
};

export const signInReducer = createAppReducer(reducer, ACTION_GROUP);