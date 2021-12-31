import { LocalStorage } from '../../../utils/storageHelpers';
import { DEFAULT_THEME } from '../../../constants/themes';

const STORAGE_UI_THEME_KEY = 'ui.theme';

export const saveThemeId = (themeId) => {
  LocalStorage.save(STORAGE_UI_THEME_KEY, themeId);
};

export const getThemeId = () => {
  return LocalStorage.get(STORAGE_UI_THEME_KEY) || DEFAULT_THEME;
};