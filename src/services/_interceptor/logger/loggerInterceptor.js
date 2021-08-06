import { ConsoleLogger } from '../../../utils/loggers';

export const requestLoggerInterceptor = (apiInstance) => {
  if (ConsoleLogger.enable) {
    apiInstance.interceptors.request.use(
      (request) => {
        console.info('>>> API REQUEST >>>', request);
        return request;
      },
      (error) => {
        console.info('>>> API REQUEST (ERROR) >>>', error);
        return Promise.reject(error);
      });
  }
};

export const responseLoggerInterceptor = (apiInstance) => {
  if (ConsoleLogger.enable) {
    apiInstance.interceptors.response.use(
      (response) => {
        console.info(`<<< API RESPONSE (${response.status}) <<<`, response);
        return response;
      },
      (error) => {
        if (error.response) {
          console.info(`<<< API RESPONSE (${error.response.status}) <<<`, error.response);
          return Promise.resolve(error.response);
        }
        return Promise.reject(error);
      });
  }
};