import { CHANGE_LANGUAGE } from '../../../actionTypes';
import { getLanguage } from '../../../../services/ui/language/languageService';
import { StateHelpers } from '../../../../utils/stateHelpers';

const DEFAULT_STATE = {
  languageId: getLanguage()
};

const languageReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return StateHelpers.updateFields(state, action.payload, ['languageId']);

    default:
      return state;
  }
};

export default languageReducer;