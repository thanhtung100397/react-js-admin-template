import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { fromInputProps, inputPropTypes, useAppFormItem } from '../base';
import { InputNumber } from 'antd';
import '../AppInput.scss';
import './AppNumberInput.scss';

const propTypes = {
  ...baseProps,
  ...inputPropTypes,
  max: PropTypes.number,
  min: PropTypes.number,
  precision: PropTypes.number, // The precision of input value
  formatter: PropTypes.func, // Specifies the format of the value presented
  parser: PropTypes.func, // Specifies the value extracted from formatter
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //The number to which the current value is increased or decreased
  onStep: PropTypes.func, // The callback function that is triggered when click up or down buttons:
                          // (value: number, type: 'number' | string, action: 'up' | 'down') => {}
};

const defaultProps = {
  step: 1
};

const AppNumberInput = (props) => {
  const getValue = useCallback((ref) => ref.current?.value || undefined, []);
  const [ref, disabled] = useAppFormItem(props.disabled, getValue);
  const className = classNames('app-input', 'app-number-input');
  return (
    <InputNumber {...fromBaseProps({className: className}, props)}
                 {...fromInputProps(props, ['allowClear'])}
                 ref={ref} disabled={disabled} max={props.max} min={props.min}
                 precision={props.precision} formatter={props.formatter} parser={props.parser}
                 step={props.step} onStep={props.onStep}/>
  )
};

AppNumberInput.propTypes = propTypes;

AppNumberInput.defaultProps = defaultProps;

export default AppNumberInput;

