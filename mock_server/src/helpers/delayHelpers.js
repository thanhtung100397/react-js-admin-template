const { delay } = require('lodash');

exports.delayMillis = async (millis) => {
  return new Promise((resolve, reject) => {
    try {
      delay(resolve, millis);
    } catch (e) {
      reject(e);
    }
  });
};
