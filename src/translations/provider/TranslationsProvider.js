import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider, createIntl, createIntlCache } from 'react-intl';
import { DEFAULT_LOCALE, Translations } from '../../constants/constants';
import { getLanguage } from '../../services/ui/language/languageService';

const appIntlCache = createIntlCache();

class AppIntl {
  getMessage({id, values}, defaultValue) {
    const currentLanguageId = getLanguage();
    if (this.languagueId !== currentLanguageId) {
      this.languagueId = currentLanguageId;
      this.intl = createIntl({
        locale: this.locale,
        messages: Translations[currentLanguageId]?.src
      }, appIntlCache);
    }
    return this.intl.formatMessage({
      id: id,
      defaultMessage: defaultValue
    }, values);
  }
}

export const appIntl = new AppIntl();

const propTypes = {
  locale: PropTypes.string
};

const defaultProps = {
  locale: DEFAULT_LOCALE
};

const TranslationProvider = (props) => {
  const currentLanguageId = useSelector((state) => state.ui?.language?.languageId);
  return (
    <IntlProvider locale={currentLanguageId} messages={Translations[currentLanguageId]?.src}>
      {props.children}
    </IntlProvider>
  )
};

TranslationProvider.propTypes = propTypes;

TranslationProvider.defaultProps = defaultProps;

export default TranslationProvider;