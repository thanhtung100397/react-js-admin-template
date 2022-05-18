import React from 'react';
import { useAppLanguage } from "../../state/ui/language/languageHook";
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
        locale: this.languagueId,
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
};

const findTranslation = (locale, appLocale) => {
  if (Translations[locale]?.src) {
    return {
      locale: locale,
      src: Translations[locale].src
    }
  }
  if (Translations[appLocale]?.src) {
    return {
      locale: appLocale,
      src: Translations[appLocale].src
    }
  }
  locale = DEFAULT_LOCALE;
  return {
    locale: locale,
    src: Translations[locale]?.src
  }
}

const TranslationProvider = (props) => {
  const appLocale = useAppLanguage();
  const translation = findTranslation(props.locale, appLocale);
  return (
    <IntlProvider locale={translation.locale} messages={translation.src}>
      {props.children}
    </IntlProvider>
  )
};

TranslationProvider.propTypes = propTypes;

TranslationProvider.defaultProps = defaultProps;

export default TranslationProvider;