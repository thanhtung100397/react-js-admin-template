import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';
import { getLanguage } from '../../../services/ui/language/languageService';
import { StateHelpers } from '../../../utils/stateHelpers';
import { createAppReducer } from '../../_base/appReducer';
import { ACTION_GROUP } from './languageAction';
import { getActionPayload, getActionType } from '../../_base/appAction';

export const TARGET_ACTION_GROUPS = [ACTION_GROUP];

export const APP_UI_LANGUAGE_ID_FIELD = 'languageId';

const DEFAULT_STATE = {
  [APP_UI_LANGUAGE_ID_FIELD]: getLanguage()
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (getActionType(action)) {
    case CHANGE_LANGUAGE_ACTION:
      return StateHelpers.updateFields(state, getActionPayload(action), [APP_UI_LANGUAGE_ID_FIELD]);

    default:
      return state;
  }
};

const languageReducer = createAppReducer(reducer, TARGET_ACTION_GROUPS);

export default languageReducer;