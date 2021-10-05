import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { changeLanguageAction } from '../../state/ui/component/language/languageAction';
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

  const currentLanguageID = useSelector((state) => state.ui?.language?.languageId)
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentValue(currentLanguageID);
  }, [currentLanguageID]);

  const handleOnChange = (languageId) => {
    setCurrentValue(languageId);
    dispatch(changeLanguageAction(languageId));
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