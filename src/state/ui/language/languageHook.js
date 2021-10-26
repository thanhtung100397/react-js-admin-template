import { useSelector } from 'react-redux';
import { stringJoin } from '../../../utils/stringHelpers';
import { getObjField } from '../../../utils/helpers';
import { getStorePath } from '../../_base/appReducer';
import languageReducer from './languageReducer';

export const useAppLanguage = () => {
  return useSelector((state) => getObjField(state, stringJoin('.', getStorePath(languageReducer), 'languageId')));
};