import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { API_FETCHING_STATUS_FIELD, FetchingStatus } from './apiReducer';
import { useAppSelector } from '../appHook';
import { getActionId } from '../appAction';

export const useApiCall = (ApiActions, apiReducer) => {
  const dispatch = useDispatch();
  const [apiActionId, setApiActionId] = useState();

  const callApi = useCallback((...params) => {
    const apiAction = ApiActions.FETCH_API(...params);
    setApiActionId(getActionId(apiAction));
    dispatch(apiAction);
  }, [dispatch, ApiActions]);

  const apiFetchingWatcher = useApiFetchingWatcher(apiReducer, apiActionId);

  const apiResultWatcher = useApiResultWatcher(apiReducer, apiActionId);

  return [callApi, apiFetchingWatcher, apiResultWatcher]
};

export const useApiFetchingWatcher = (apiReducer, apiActionId) => {
  const fetchingStatus = useAppSelector(apiReducer, `${apiActionId}.${API_FETCHING_STATUS_FIELD}`);
  return useMemo(() => ({
    isIdle: !fetchingStatus || fetchingStatus === FetchingStatus.IDLE,
    isInProgress: fetchingStatus === FetchingStatus.IN_PROGRESS,
    isError: fetchingStatus === FetchingStatus.ERROR
  }), [fetchingStatus]);
};

export const useApiResultWatcher = (apiReducer, apiActionId) => {
  const apiResult = useAppSelector(apiReducer, apiActionId);
  return useMemo(() => apiResult || {}, [apiResult]);
};

export const createApiHook = (apiReducer, apiActions) => {
  return {
    useCall: () => useApiCall(apiActions, apiReducer),
    useFetchingWatcher: (apiActionId) => useApiFetchingWatcher(apiReducer, apiActionId),
    useResultWatcher: (apiActionId) => useApiResultWatcher(apiReducer, apiActionId)
  }
};