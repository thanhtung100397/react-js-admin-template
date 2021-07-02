import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { AppFormItemContext } from '../form/AppFormItem';
import { Input } from 'antd';
import './AppInput.scss';

const propTypes = {
  ...baseProps,
  id: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool
};

const defaultProps = {
  allowClear: false,
  disabled: false
};

const AppInput = (props) => {
  const { setInputRef } = useContext(AppFormItemContext);
  const [disabled, setDisabled] = useState();
  const ref = useRef({});

  useEffect(() => {
    setDisabled(props.disabled);
  }, [props.disabled]);

  useEffect(() => {
    setInputRef && setInputRef({
      getValue: () => ref.current?.state.value,
      disable: (disabled) => setDisabled(disabled)
    });
  }, [setInputRef]);

  return (
    <Input {...fromBaseProps({className: 'app-input'}, props)}
           ref={ref} id={props.id} allowClear={props.allowClear} maxLength={props.maxLength} disabled={disabled}
           value={props.value} defaultValue={props.defaultValue} placeholder={props.placeholder}
           onChange={props.onChange} prefix={props.icon}/>
  )
};

AppInput.propTypes = propTypes;

AppInput.defaultProps = defaultProps;

export default AppInput;