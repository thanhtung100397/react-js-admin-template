const { random } = require('lodash');

exports.randomInt = (fromInclude, toInclude) => {
  return random(fromInclude, toInclude);
}