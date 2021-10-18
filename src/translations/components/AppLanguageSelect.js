import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppLanguage } from '../../state/ui/language/languageHook';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import LanguageActions from '../../state/ui/language/languageAction';
import { Translations } from '../../constants/constants';
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
  const [currentValue, setCurrentValue] = useState();

  const currentLanguageID = useAppLanguage();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentValue(currentLanguageID);
  }, [currentLanguageID]);

  const handleOnChange = (languageId) => {
    setCurrentValue(languageId);
    dispatch(LanguageActions.CHANGE_LANGUAGE_ACTION(languageId));
  };

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
               value={currentValue} onChange={handleOnChange}
               icon={props.icon} borderless={props.borderless}>
      {languageOptions}
    </AppSelect>
  )
};

AppLanguageSelect.propTypes = propTypes;

AppLanguageSelect.default = defaultProps;

export default AppLanguageSelect;