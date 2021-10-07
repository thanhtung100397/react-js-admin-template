import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';
import { saveLanguage } from '../../../services/ui/language/languageService';

export function* onLanguageChanged(action) {
  yield saveLanguage(action.payload?.languageId);
}

export const languageSaga = [
  {
    action: CHANGE_LANGUAGE_ACTION,
    trigger: onLanguageChanged
  }
];

export default languageSaga;