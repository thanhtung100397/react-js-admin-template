import React from 'react';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { inputPropTypes, fromInputProps } from '../base';
import { useAppFormItem } from '../../form/AppFormItem';
import { Input } from 'antd';
import '../AppInput.scss';
import './AppTextInput.scss';

const propTypes = {
  ...baseProps,
  ...inputPropTypes
};

const defaultProps = {
};

const AppTextInput = (props) => {
  const [onChange, disabled] = useAppFormItem(props.disabled, props.onChange);
  return (
    <Input {...fromBaseProps({className: classNames('app-input', 'app-text-input')}, props)}
           {...fromInputProps(props)}
           onChange={onChange} disabled={disabled}/>
  )
};

AppTextInput.propTypes = propTypes;

AppTextInput.defaultProps = defaultProps;

export default AppTextInput;