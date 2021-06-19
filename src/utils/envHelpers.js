
/**
 * Return ENV value specified in current activated .env file
 */
export const currentEnv = () => {
  return process.env.REACT_APP_ENV;
}