import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';
import { getLanguage } from '../../../services/ui/language/languageService';
import { StateHelpers } from '../../../utils/stateHelpers';
import { createAppReducer } from '../../_base/appReducer';
import { ACTION_GROUP } from './languageAction';
import { getActionPayload, getActionType } from '../../_base/appAction';

export const ALLOWED_ACTION_GROUPS = [ACTION_GROUP];

const DEFAULT_STATE = {
  languageId: getLanguage()
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (getActionType(action)) {
    case CHANGE_LANGUAGE_ACTION:
      return StateHelpers.updateFields(state, getActionPayload(action), ['languageId']);

    default:
      return state;
  }
};

export default languageReducer = createAppReducer(reducer, ALLOWED_ACTION_GROUPS);