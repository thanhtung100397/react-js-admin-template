import { CHANGE_THEME_ACTION } from '../../actionTypes';
import { getThemeId } from '../../../services/ui/theme/themeService';
import { StateHelpers } from '../../../utils/stateHelpers';
import { createAppReducer } from '../../_base/appReducer';
import { ACTION_GROUP } from './themeAction';
import { ObjectHelpers } from '../../../utils/objectHelpers';

export const TARGET_ACTION_GROUPS = [ACTION_GROUP];

const DEFAULT_STATE = {
  themeId: getThemeId()
};

const reducer = (state = DEFAULT_STATE, action, actionType, actionPayload) => {
  switch (actionType) {
    case CHANGE_THEME_ACTION:
      return StateHelpers.updateField(state, 'themeId', ObjectHelpers.getField(actionPayload, 'themeId'));

    default:
      return state;
  }
};

const themeReducer = createAppReducer(reducer, TARGET_ACTION_GROUPS);

export default themeReducer;