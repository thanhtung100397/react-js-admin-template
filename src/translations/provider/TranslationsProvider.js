import React from 'react';
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
  return (
    <IntlProvider locale={props.locale} messages={Translations[props.locale]?.src}>
      {props.children}
    </IntlProvider>
  )
};

TranslationProvider.propTypes = propTypes;

TranslationProvider.defaultProps = defaultProps;

export default TranslationProvider;