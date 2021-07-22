import { LocalStorage } from '../../../utils/storageHelpers';

const STORAGE_UI_LANGUAGE_KEY = 'ui.language';

export const saveLanguage = (languageId) => {
  LocalStorage.save(STORAGE_UI_LANGUAGE_KEY, languageId);
}

export const getLanguage = () => {
  return LocalStorage.get(STORAGE_UI_LANGUAGE_KEY);
}