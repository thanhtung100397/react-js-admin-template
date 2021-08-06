import { CHANGE_LANGUAGE } from '../../actionTypes';
import { saveLanguage } from '../../../services/ui/language/languageService';

export function* onLanguageChanged(action) {
  yield saveLanguage(action.payload?.languageId);
}

export const languageSaga = [
  {
    action: CHANGE_LANGUAGE,
    trigger: onLanguageChanged
  }
];

export default languageSaga;