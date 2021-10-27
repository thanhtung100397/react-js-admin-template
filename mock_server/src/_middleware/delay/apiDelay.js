const { extractRequestDelayMillis } = require('../../constants/requests');
const { delayMillis } = require('../../helpers/delayHelpers');

exports.requestDelay = async (req, res, next) => {
  const reqDelayMillis = extractRequestDelayMillis(req);
  console.log(reqDelayMillis);
  if (reqDelayMillis && reqDelayMillis > 0) {
    await delayMillis(reqDelayMillis);
  }
  next();
};

