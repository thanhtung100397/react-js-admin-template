import { useSelector } from 'react-redux';
import { getObjField } from '../../utils/helpers';
import { stringJoin } from '../../utils/stringHelpers';
import { getStorePath } from './appReducer';

export const useAppSelector = (appReducer, fieldPath) => {
  return useSelector((state) =>
    getObjField(state, stringJoin('.', getStorePath(appReducer), fieldPath))
  );
};
