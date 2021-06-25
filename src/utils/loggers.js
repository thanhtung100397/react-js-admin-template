
export const ConsoleLogger = {
  enable: process.env.REACT_APP_ENABLE_CONSOLE_LOGGER || true,
  info: (message, data) => ConsoleLogger.enable && console.info(message, data),
  debug: (message, data) => ConsoleLogger.enable && console.debug(message, data),
  error: (message, data) => ConsoleLogger.enable && console.error(message, data)
};