const vi = require('./vi.json');
const en = require('./en.json');

const DEFAULT_LANG = 'en';

const appTranslations = {
  vi: vi,
  en: en
};

exports.findTranslatedMessage = (messageId, language = DEFAULT_LANG, defaultValue) => {
  let translation = appTranslations[language];
  if (translation) {
    return translation[messageId] || defaultValue || messageId;
  }
  return defaultValue || messageId;
};

