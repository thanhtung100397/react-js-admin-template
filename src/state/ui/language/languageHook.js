import languageReducer, { APP_UI_LANGUAGE_ID_FIELD } from './languageReducer';
import { useAppSelector } from '../../_base/appHook';

export const useAppLanguage = () => {
  return useAppSelector(languageReducer, APP_UI_LANGUAGE_ID_FIELD);
};