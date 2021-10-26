import {
  API_FETCHING_ACTION, API_RESPONSE_SUCCESS_ACTION,
  API_RESPONSE_FAILURE_ACTION, API_FETCHING_ERROR_ACTION
} from '../../actionTypes';
import { createAppActions, getActionId } from '../appAction';

export const getFetchActionId = (action) => action.fetchActionId;

export const isShowNotification = (action) => action.showNoti;

export const createApiActions = (actionGroup) => {
  return createAppActions({
    FETCH_API: (data, showNoti = true) => ({
      type: API_FETCHING_ACTION,
      group: actionGroup,
      showNoti: showNoti,
      payload: data
    }),

    API_RESPONSE_SUCCESS: (res, fetchAction) => ({
      type: API_RESPONSE_SUCCESS_ACTION,
      group: actionGroup,
      fetchActionId: getActionId(fetchAction),
      payload: res
    }),

    API_RESPONSE_FAILURE: (res, fetchAction) => ({
      type: API_RESPONSE_FAILURE_ACTION,
      group: actionGroup,
      fetchActionId: getActionId(fetchAction),
      payload: res
    }),

    API_FETCHING_ERROR: (error, fetchAction) => ({
      type: API_FETCHING_ERROR_ACTION,
      group: actionGroup,
      fetchActionId: getActionId(fetchAction),
      payload: error
    })
  });
};