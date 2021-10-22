import { createAppActions } from '../../_base/appAction';
import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';

export const ACTION_GROUP = 'APP_UI_LANGUAGE';

const LanguageActions = createAppActions({
  CHANGE_LANGUAGE_ACTION: (languageId) => ({
    type: CHANGE_LANGUAGE_ACTION,
    group: ACTION_GROUP,
    payload: {
      languageId: languageId
    }
  })
});

export default LanguageActions;