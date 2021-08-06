import axios from 'axios';
import { requestLoggerInterceptor, responseLoggerInterceptor } from './_interceptor/logger/loggerInterceptor';
import { networkInterceptor } from './_interceptor/network/networkInterceptor';

export const CancelToken = axios.CancelToken;

const newApiClient = (baseUrl) => {
  let apiInstance = axios.create({
    baseURL: baseUrl
  });
  requestLoggerInterceptor(apiInstance);
  responseLoggerInterceptor(apiInstance);
  networkInterceptor(apiInstance);
  return apiInstance;
};

export const appApiClient = newApiClient(process.env.REACT_APP_BASE_APP_API_CLIENT);