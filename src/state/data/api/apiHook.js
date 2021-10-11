import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getObjField } from '../../../utils/helpers';
import { FETCHING_STATUS_FIELD, FetchingStatus } from './apiReducer';

export const useApiFetchingWatcher = (action = {}) => {

  const fetchingStatus = useSelector((state) => getObjField(state, `${action.path}.${action.id}.${FETCHING_STATUS_FIELD}`));

  return useMemo(() => ({
    isIdle: !fetchingStatus || fetchingStatus === FetchingStatus.IDLE,
    isInProgress: fetchingStatus === FetchingStatus.IN_PROGRESS,
    isError: fetchingStatus === FetchingStatus.ERROR
  }), [fetchingStatus]);
};

export const useApiResultWatcher = (action = {}) => {
  return useSelector((state) => getObjField(state, `${action.path}.${action.id}`)) || {};
};