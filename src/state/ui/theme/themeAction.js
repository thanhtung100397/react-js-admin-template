import { createAppActions } from '../../_base/appAction';
import { CHANGE_THEME_ACTION } from '../../actionTypes';

export const ACTION_GROUP = 'APP_UI_THEME';

const actions = {
  CHANGE_THEME_ACTION: (themeId) => ({
    type: CHANGE_THEME_ACTION,
    payload: {
      themeId: themeId
    }
  })
};

const ThemeActions = createAppActions(actions, ACTION_GROUP);

export default ThemeActions;