import { CUSTOM_ERROR_MESSAGE_FIELD, CUSTOM_ERROR_TYPE_FIELD } from './apiClient';

export const isSuccess = (res) => {
  return getHttpStatus(res) === 200;
};

export const getHttpStatus = (res) => {
  return res.status;
};

export const getHttpStatusText = (res) => {
  return res.statusText;
};

export const getHeaders = (res) => {
  return res.headers;
};

export const getCode = (res) => {
  return res.data?.code;
};

export const getMessage = (res) => {
  return res.data?.msg;
};

export const getData = (res) => {
  return res.data?.data;
};

export const getErrorMessage = (error) => {
  return error[CUSTOM_ERROR_MESSAGE_FIELD] || error.message;
};

export const getErrorType = (error) => {
  return error[CUSTOM_ERROR_TYPE_FIELD];
};