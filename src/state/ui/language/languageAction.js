import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';

export const changeLanguageAction = (languageId) => ({
  type: CHANGE_LANGUAGE_ACTION,
  payload: {
    languageId: languageId
  }
});