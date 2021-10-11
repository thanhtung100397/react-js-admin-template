import { CUSTOM_ERROR_MESSAGE_FIELD } from './apiClient';

export const isSuccess = (res) => {
  return res.httpStatus === 200;
};

export const getHttpStatus = (res) => {
  return res.httpStatus;
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