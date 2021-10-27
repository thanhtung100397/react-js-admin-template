import { createAppActions } from '../../_base/appAction';
import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';

export const ACTION_GROUP = 'APP_UI_LANGUAGE';

const actions = {
  CHANGE_LANGUAGE_ACTION: (languageId) => ({
    type: CHANGE_LANGUAGE_ACTION,
    payload: {
      languageId: languageId
    }
  })
};

const LanguageActions = createAppActions(actions, ACTION_GROUP);

export default LanguageActions;