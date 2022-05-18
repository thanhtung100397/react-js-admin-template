import themeReducer from './themeReducer';
import { useAppSelector } from '../../_base/appHook';
import { Themes, DEFAULT_THEME } from '../../../constants/constants';

export const useAppThemeId = () => {
  return useAppSelector(themeReducer, 'themeId');
};

export const useAppTheme = () => {
  const themeId = useAppThemeId();
  return Themes[themeId] || Themes[DEFAULT_THEME];
};