
export const ConsoleLogger = {
  enable: process.env.REACT_APP_ENABLE_CONSOLE_LOGGER || true,
  info: (data) => ConsoleLogger.enable && console.info(data),
  debug: (data) => ConsoleLogger.enable && console.debug(data),
  error: (data) => ConsoleLogger.enable && console.error(data)
}