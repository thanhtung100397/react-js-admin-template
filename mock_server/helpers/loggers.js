
const ENABLE_LOGGER = process.env.REACT_APP_ENABLE_MOCK_SERVER_CONSOLE_LOGGER || true;

exports.ConsoleLogger = {
  enable: process.env.REACT_APP_ENABLE_MOCK_SERVER_CONSOLE_LOGGER || true,
  info: (...data) => ENABLE_LOGGER && console.info(...data),
  debug: (...data) => ENABLE_LOGGER && console.debug(...data),
  error: (...data) => ENABLE_LOGGER && console.error(...data)
};
