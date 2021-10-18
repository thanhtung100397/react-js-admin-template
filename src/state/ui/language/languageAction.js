import { createAppActions } from '../../_base/appAction';
import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';

export const LANGUAGE_STORE_PATH = 'ui.language';

const LanguageActions = createAppActions({
  CHANGE_LANGUAGE_ACTION: (languageId) => ({
    type: CHANGE_LANGUAGE_ACTION,
    storePath: LANGUAGE_STORE_PATH,
    payload: {
      languageId: languageId
    }
  })
});

export default LanguageActions;