import { getCode, getData, getHeaders, getHttpStatus, getMessage, isSuccess } from '../../../services/apiHelpers';

export const FETCHING_FLAG_FIELD = 'isFetching';

export const BASE_API_DATA_STATE = {
  isFetching: false,
  isSuccess: undefined,
  httpStatus: undefined,
  headers: undefined,
  code: undefined,
  msg: undefined,
  data: undefined
};

export const apiResToState = (res) => ({
  isFetching: false,
  isSuccess: isSuccess(res),
  httpStatus: getHttpStatus(res),
  headers: getHeaders(res),
  code: getCode(res),
  msg: getMessage(res),
  data: getData(res)
});