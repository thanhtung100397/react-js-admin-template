const { extractRequestDelayMillis } = require('../../constants/requests');
const { delayMillis } = require('../../helpers/delayHelpers');
const { randomInt } = require('../../helpers/randomHelpers');

const ENABLE_REQUEST_DELAY_SIMULATION = process.env.API_REQUEST_DELAY_MILLIS_ENABLE === 'true';

const createRandomMillisGenerator = (minMillis, maxMillis, stepMillis) => {
  if (!minMillis || minMillis < 0) {
    minMillis = 0;
  }
  if (!maxMillis || maxMillis < 0) {
    maxMillis = 0;
  }
  if (!stepMillis || stepMillis < 0) {
    stepMillis = 1;
  }
  const diffMillis = maxMillis - minMillis;
  return {
    randomMillis: () => {
      if (maxMillis < minMillis) {
        return minMillis;
      }
      if (stepMillis > diffMillis) {
        return randomInt(0, 1)? minMillis : maxMillis;
      }
      const randomMultiple = randomInt(0, Math.ceil(diffMillis / stepMillis));
      const randomMillis = minMillis + randomMultiple * stepMillis;
      return randomMillis > maxMillis? maxMillis : randomMillis;
    }
  }
};

const randomMillisGenerator = createRandomMillisGenerator(
  parseInt(process.env.API_REQUEST_DELAY_MILLIS_MIN),
  parseInt(process.env.API_REQUEST_DELAY_MILLIS_MAX),
  parseInt(process.env.API_REQUEST_DELAY_MILLIS_STEP)
);

exports.requestDelay = async (req, res, next) => {
  let reqDelayMillis = extractRequestDelayMillis(req);
  if (reqDelayMillis === undefined) {
    if (ENABLE_REQUEST_DELAY_SIMULATION) {
      reqDelayMillis = randomMillisGenerator.randomMillis();
    } else {
      reqDelayMillis = 0;
    }
  }
  if (reqDelayMillis > 0) {
    await delayMillis(reqDelayMillis);
  }
  next();
};