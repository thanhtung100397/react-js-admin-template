import { CHANGE_LANGUAGE_ACTION } from '../../actionTypes';
import { getLanguage } from '../../../services/ui/language/languageService';
import { StateHelpers } from '../../../utils/stateHelpers';

const DEFAULT_STATE = {
  languageId: getLanguage()
};

const languageReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE_ACTION:
      return StateHelpers.updateFields(state, action.payload, ['languageId']);

    default:
      return state;
  }
};

export default languageReducer;