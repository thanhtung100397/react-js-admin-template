import themeReducer from './themeReducer';
import { useAppSelector } from '../../_base/appHook';
import { getAppTheme } from '../../../constants/themes';

export const useAppThemeId = () => {
  return useAppSelector(themeReducer, 'themeId');
};

export const useAppTheme = () => {
  const themeId = useAppThemeId();
  return getAppTheme(themeId);
};