import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { DEFAULT_LOCALE, Translations } from '../../constants/constants';
import AppSelect from '../../components/select/AppSelect';
import './AppLanguageSelect.scss';

const { Option } = AppSelect;

const propTypes = {
  ...baseProps,
  borderless: PropTypes.bool,
  icon: PropTypes.node
};

const defaultProps = {
};

const AppLanguageSelect = (props) => {

  const languageOptions = useMemo(() => {
    return Object.keys(Translations).map((languageKey) => {
      return (
        <Option key={languageKey} value={languageKey}>
          {Translations[languageKey].name || languageKey}
        </Option>
      )
    })
  }, []);

  return (
    <AppSelect {...fromBaseProps({ className: 'app-language-select' }, props)}
               defaultValue={DEFAULT_LOCALE} icon={props.icon} borderless={props.borderless}>
      {languageOptions}
    </AppSelect>
  )
};

AppLanguageSelect.propTypes = propTypes;

AppLanguageSelect.default = defaultProps;

export default AppLanguageSelect;