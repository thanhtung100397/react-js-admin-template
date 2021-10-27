
exports.extractRequestLanguage = (request) => {
  return request.query['lang'];
};

exports.extractRequestDelayMillis = (request) => {
  return parseInt(request.query['delayMillis']) || undefined;
};
