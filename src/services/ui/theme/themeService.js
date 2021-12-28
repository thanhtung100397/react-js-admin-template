import { LocalStorage } from '../../../utils/storageHelpers';
import { DEFAULT_THEME } from '../../../constants/constants';

const STORAGE_UI_THEME_KEY = 'ui.theme';

export const saveTheme = (themeId) => {
  LocalStorage.save(STORAGE_UI_THEME_KEY, themeId);
};

export const getTheme = () => {
  return LocalStorage.get(STORAGE_UI_THEME_KEY) || DEFAULT_THEME;
};