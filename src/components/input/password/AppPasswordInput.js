import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { fromInputProps, inputPropTypes, AutoComplete } from '../base';
import { useIntl } from 'react-intl';
import { useAppFormItem } from '../../form/AppFormItem';
import { Input } from 'antd';
import '../AppInput.scss';
import './AppPasswordInput.scss';

const { Password } = Input;

const propTypes = {
  ...baseProps,
  ...inputPropTypes,
  allowShow: PropTypes.bool
};

const defaultProps = {
  autoComplete: AutoComplete.OFF
};

const AppPasswordInput = (props) => {
  const [onChange, disabled] = useAppFormItem(props.disabled, props.onChange);
  const intl = useIntl();
  return (
    <Password {...fromBaseProps({className: classNames('app-input', 'app-password-input')}, props)}
              {...fromInputProps(props, undefined, intl)}
              onChange={onChange} disabled={disabled} visibilityToggle={props.allowShow}/>
  )
};

AppPasswordInput.propTypes = propTypes;

AppPasswordInput.defaultProps = defaultProps;

export default AppPasswordInput;