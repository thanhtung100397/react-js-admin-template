import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION,
  API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION
} from '../../actionTypes';
import { createAppActions, getActionId } from '../appAction';

export const getFetchActionId = (action) => action.fetchActionId;

export const isShowNotification = (action) => action.showNoti;

export const createApiActions = (storePath) => {
  return createAppActions({
    FETCH_API: (data, showNoti = true) => ({
      type: API_FETCHING_ACTION(storePath),
      storePath: storePath,
      showNoti: showNoti,
      payload: data
    }),

    API_RESPONSE_SUCCESS: (res, fetchAction) => ({
      type: API_RESPONSE_SUCCESS_ACTION(storePath),
      storePath: storePath,
      fetchActionId: getActionId(fetchAction),
      payload: res
    }),

    API_RESPONSE_FAILURE: (res, fetchAction) => ({
      type: API_RESPONSE_FAILURE_ACTION(storePath),
      storePath: storePath,
      fetchActionId: getActionId(fetchAction),
      payload: res
    }),

    API_FETCHING_ERROR: (error, fetchAction) => ({
      type: API_FETCHING_ERROR_ACTION(storePath),
      storePath: storePath,
      fetchActionId: getActionId(fetchAction),
      payload: error
    })
  });
};