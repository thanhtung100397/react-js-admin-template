import { useSelector } from 'react-redux';
import { stringJoin } from '../../../utils/stringHelpers';
import { LANGUAGE_STORE_PATH } from './languageAction';
import { getObjField } from '../../../utils/helpers';

export const useAppLanguage = () => {
  return useSelector((state) => getObjField(state, stringJoin('.', LANGUAGE_STORE_PATH, 'languageId')));
};