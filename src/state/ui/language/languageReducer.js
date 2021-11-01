import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';
import { getLanguage } from '../../../services/ui/language/languageService';
import { StateHelpers } from '../../../utils/stateHelpers';
import { createAppReducer } from '../../_base/appReducer';
import { ACTION_GROUP } from './languageAction';
import { ObjectHelpers } from '../../../utils/objectHelpers';

export const TARGET_ACTION_GROUPS = [ACTION_GROUP];

export const APP_UI_LANGUAGE_ID_FIELD = 'languageId';

const DEFAULT_STATE = {
  [APP_UI_LANGUAGE_ID_FIELD]: getLanguage()
};

const reducer = (state = DEFAULT_STATE, action, actionType, actionPayload) => {
  switch (actionType) {
    case CHANGE_LANGUAGE_ACTION:
      return StateHelpers.updateField(state, APP_UI_LANGUAGE_ID_FIELD, ObjectHelpers.getField(actionPayload, APP_UI_LANGUAGE_ID_FIELD));

    default:
      return state;
  }
};

const languageReducer = createAppReducer(reducer, TARGET_ACTION_GROUPS);

export default languageReducer;