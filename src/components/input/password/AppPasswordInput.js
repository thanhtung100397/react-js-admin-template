import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { fromInputProps, inputPropTypes } from '../base';
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
};

const AppPasswordInput = (props) => {
  const [ref, disabled] = useAppFormItem(props.disabled);
  return (
    <Password {...fromBaseProps({className: classNames('app-input', 'app-password-input')}, props)}
              {...fromInputProps(props)}
              ref={ref} disabled={disabled} visibilityToggle={props.allowShow}/>
  )
};

AppPasswordInput.propTypes = propTypes;

AppPasswordInput.defaultProps = defaultProps;

export default AppPasswordInput;