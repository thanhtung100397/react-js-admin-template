import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE, Translations } from '../../constants/constants';

const propTypes = {
  locale: PropTypes.string
};

const defaultProps = {
  locale: DEFAULT_LOCALE
}

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