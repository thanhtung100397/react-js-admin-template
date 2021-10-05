import { apiResToState, BASE_API_DATA_STATE, FETCHING_FLAG_FIELD } from '../../index';
import { SIGN_IN, SIGN_IN_FAILURE, SIGN_IN_SUCCESS } from '../../../../actionTypes';
import { updateState, updateStateField } from '../../../../stateHelpers';

const DEFAULT_STATE = {
  ...BASE_API_DATA_STATE
};

export const signInReducers = (state = DEFAULT_STATE, action) => {
  console.log('AUTH REDUCER', action);
  switch (action.type) {
    case SIGN_IN:
      return updateStateField(state, FETCHING_FLAG_FIELD, true);
    case SIGN_IN_SUCCESS:
    case SIGN_IN_FAILURE:
      return updateState(state, apiResToState(action.payload));

    default:
      return state;
  }
};

export default signInReducers;
