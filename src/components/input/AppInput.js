import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../base';
import { Input } from 'antd';
import AppSpinner from '../spiner/AppSpinner';
import { CheckCircleTwoTone, WarningTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { ValidateStatus } from '../../constants/constants';
import { TypeChecker, Generator } from '../../utils/helpers';
import colors from '../../colors.module.scss';
import './AppInput.scss';
import { spawn } from 'env-cmd/dist/spawn';

const LayoutDirection = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
};

const ValidateStatusIcons = {
  [ValidateStatus.SUCCESS]: <CheckCircleTwoTone twoToneColor={colors.success}/>,
  [ValidateStatus.WARNING]: <WarningTwoTone twoToneColor={colors.warning}/>,
  [ValidateStatus.ERROR]: <CloseCircleTwoTone twoToneColor={colors.error}/>,
  [ValidateStatus.VALIDATING]: <AppSpinner width={14} height={14}/>,
};

const propTypes = {
  ...baseProps,
  type: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  layoutDirection: PropTypes.oneOf(Object.keys(LayoutDirection).map((key) => LayoutDirection[key])),
  labelCol: PropTypes.exact({
    span: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  inputCol: PropTypes.exact({
    span: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  validateStatus: PropTypes.oneOf(Object.keys(ValidateStatus).map((key) => ValidateStatus[key])),
  validateMessage: PropTypes.node,
  validateRules: PropTypes.arrayOf(PropTypes.exact({
    transform: PropTypes.func, // (value) => {} support async/Promise
    trigger: PropTypes.func, // (value, valid, transformValue) => {}
    validate: PropTypes.func, // (value) => {} support async/Promise
    message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) // node || (value) => {}
  }))
};

const defaultProps = {
  layoutDirection: LayoutDirection.HORIZONTAL,
  inputCol: {
    span: 1
  }
};

const renderInputLabel = (props, verticalLayout) => {
  if (props.label) {
    return (
      <div className="input-label"
           style={!verticalLayout && props.labelCol && {
             flex: props.labelCol.span,
             width: props.labelCol.width
           }}>
        {props.label}
      </div>
    );
  }
};

const renderValidateIcon = (validateStatus) => {
  if (!ValidateStatusIcons[validateStatus]) {
    return;
  }
  return (
    <div className="validate-icon">
      {ValidateStatusIcons[validateStatus]}
    </div>
  );
};

const renderInputContainer = (props, verticalLayout, inputRef) => {
  return (
    <div className={classNames('input-container',
                              {
                                'has-validate-icon': props.validateStatus && ValidateStatusIcons[props.validateStatus]
                              })}
         style={!verticalLayout && props.inputCol && {
           flex: props.inputCol.span,
           width: props.inputCol.width
         }}>
      <Input ref={inputRef} value={props.inputValue}/>
      {renderValidateIcon(props.validateStatus)}
      {renderValidateMessage(props.validateMessage)}
    </div>
  );
};

const renderValidateMessage = (validateMessage) => {
  if (validateMessage) {
    return (
      <div className="input-validate-message">
        {validateMessage}
      </div>
    );
  }
};

const transformValue = async (inputValue, transformFunc) => {
  if (transformFunc) {
    let result = transformFunc(inputValue);
    if (TypeChecker.isPromise(result)) {
      return await result;
    }
    return result;
  }
  return inputValue;
};

const validateValue = async (inputValue, validateFunc) => {
  if (validateFunc) {
    let result = validateFunc(inputValue);
    if (TypeChecker.isPromise(result)) {
      return await result;
    }
    return result;
  }
  return false;
};

const executeValidateRule = async (inputValue, rule) => {
  let transformedValue = await transformValue(inputValue, rule.transform);
  let validateResult = await validateValue(transformedValue, rule.validate);
  if (rule.trigger) {
    rule.trigger(inputValue, validateResult, transformedValue);
  }
  return validateResult;
};

const getInputValue = (inputRef) => {
  return inputRef.current?.state.value;
}

const validateRules = (inputValue, validateStatus, validateRules) => {
  let isValid = true;
  if (props.validateStatus && props.validateStatus !== ValidateStatus.WARNING) {
    isValid = props.validateStatus === ValidateStatus.SUCCESS;
  } else if (props.validateRules) {
    for (const rule of props.validateRules) {
      if (!await executeValidateRule(inputValue, rule)) {
        isValid = false;
        break;
      }
    }
  }
}

const AppInput = forwardRef((props, ref) => {
  const [componentId] = useState(() => Generator.uniqueId('AppInput_'));
  const [validationMeta, setValidationMeta] = useState(() => ({
    status: props.validateStatus,
    message: props.validateMessage
  }));
  const inputRef = useRef();

  useEffect(() => {
    setValidationMeta({
      status: props.validateStatus,
      message: props.validateMessage
    });
  }, [props.validateStatus, props.validateMessage]);

  let onRefChanged = useCallback((newRef) => {
    if (!ref) {
      return;
    }
    if (TypeChecker.isFunction(ref)) {
      ref(newRef, componentId);
    }
    ref.current = newRef;
  }, [ref, componentId]);

  let validate = useCallback(async () => {
    let inputValue = getInputValue(inputRef);

    if (!isValid) {
      setValidationMeta({
        ...validationMeta,
        status
      })
    }
    return isValid;
  }, [props.validateStatus, props.validateRules, validationMeta]);

  useImperativeHandle(onRefChanged, () => ({
    _componentId: componentId,
    validate: validate
  }), [componentId, validate]);

  const className = classNames(
    'app-input',
    {
      'app-input-success': validationMeta.status === ValidateStatus.SUCCESS,
      'app-input-warning': validationMeta.status === ValidateStatus.WARNING,
      'app-input-error': validationMeta.status === ValidateStatus.ERROR,
    }
  );

  const isLayoutVertical = props.layoutDirection === LayoutDirection.VERTICAL;

  const inputStyle = {
    flexDirection: props.layoutDirection
  };

  return (
    <div {...fromBaseProps({ className: className, style: inputStyle }, props)}>
      {renderInputLabel(props, isLayoutVertical)}
      {renderInputContainer(props, isLayoutVertical, inputRef)}
    </div>
  );
});

AppInput.propTypes = propTypes;

AppInput.defaultProps = defaultProps;

export default AppInput;