import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';
import { saveLanguage } from '../../../services/ui/language/languageService';
import { ACTION_GROUP } from './languageAction';

export function* onLanguageChanged(action) {
  yield saveLanguage(action.payload?.languageId);
}

export const languageSaga = [
  {
    action: {
      type: CHANGE_LANGUAGE_ACTION,
      group: ACTION_GROUP
    },
    trigger: onLanguageChanged
  }
];

export default languageSaga;