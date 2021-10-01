import { LocalStorage } from '../../../utils/storageHelpers';
import { DEFAULT_LOCALE } from '../../../constants/constants';

const STORAGE_UI_LANGUAGE_KEY = 'ui.language';

export const saveLanguage = (languageId) => {
  LocalStorage.save(STORAGE_UI_LANGUAGE_KEY, languageId);
};

export const getLanguage = () => {
  return LocalStorage.get(STORAGE_UI_LANGUAGE_KEY) || DEFAULT_LOCALE;
};