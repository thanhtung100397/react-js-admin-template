import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppThemeId } from '../../state/ui/theme/themeHook';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import ThemeActions from '../../state/ui/theme/themeAction';
import { Themes } from '../../constants/constants';
import AppSelect from '../../components/select/AppSelect';
import './AppThemeSelect.scss';

const { Option } = AppSelect;

const propTypes = {
  ...baseProps,
  borderless: PropTypes.bool,
  icon: PropTypes.node
};

const defaultProps = {
};

const AppThemeSelect = (props) => {
  const [currentValue, setCurrentValue] = useState();

  const currentThemeId = useAppThemeId();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentValue(currentThemeId);
  }, [currentThemeId]);

  const handleOnChange = (themeId) => {
    setCurrentValue(themeId);
    dispatch(ThemeActions.CHANGE_THEME_ACTION(themeId));
  };

  const themeOptions = useMemo(() => {
    return Object.keys(Themes).map((themeKey) => {
      return (
        <Option key={themeKey} value={themeKey}>
          {Themes[themeKey].name || themeKey}
        </Option>
      )
    })
  }, []);

  return (
    <AppSelect {...fromBaseProps({ className: 'app-theme-select' }, props)}
               value={currentValue} onChange={handleOnChange}
               icon={props.icon} borderless={props.borderless}>
      {themeOptions}
    </AppSelect>
  )
};

AppThemeSelect.propTypes = propTypes;

AppThemeSelect.default = defaultProps;

export default AppThemeSelect;