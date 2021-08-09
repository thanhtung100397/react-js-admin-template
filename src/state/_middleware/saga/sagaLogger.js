import { ConsoleLogger } from '../../../utils/loggers';

const SagaLogger = {
  info: (sagaId, action) => {
    ConsoleLogger.info(`[SAGA WATCHER TRIGGERED] ${sagaId}`, {
      action: action
    });
  },
  error: (sagaId, action, error) => {
    ConsoleLogger.error(`[SAGA WATCHER ERROR] ${sagaId}`, {
      action: action,
      error: error
    });
  }
};

export default SagaLogger;
