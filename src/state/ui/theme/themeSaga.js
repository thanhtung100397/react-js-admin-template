import { CHANGE_THEME_ACTION } from '../../actionTypes';
import { saveThemeId } from '../../../services/ui/theme/themeService';
import { ACTION_GROUP } from './themeAction';

export function* onThemeChanged(action) {
  yield saveThemeId(action.payload?.themeId);
}

export const themeSaga = [
  {
    action: {
      type: CHANGE_THEME_ACTION,
      group: ACTION_GROUP
    },
    trigger: onThemeChanged
  }
];

export default themeSaga;