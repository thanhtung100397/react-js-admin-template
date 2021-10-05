import { CHANGE_LANGUAGE } from '../../../actionTypes';
import { newSet } from '../../../../utils/helpers';
import languageReducer from './languageReducer';
import { onLanguageChanged } from './languageSaga';

export const changeLanguageAction = (languageId) => ({
  type: CHANGE_LANGUAGE,
  target: {
    reducers: newSet(
      languageReducer
    ),
    sagas: newSet(
      onLanguageChanged
    ),
  },
  payload: {
    languageId: languageId
  }
})