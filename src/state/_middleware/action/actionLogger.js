import { ConsoleLogger } from '../../../utils/loggers';

export const actionLogger = (store) => (next) => (action) => {
  ConsoleLogger.info(`[DISPATCH ACTION] ${action.type}`, action);
  return next(action);
};
