import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
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
    transform: PropTypes.func,
    trigger: PropTypes.func,
    validate: PropTypes.func,
    message: PropTypes.node
  }))
};

const defaultProps = {
  layoutDirection: LayoutDirection.HORIZONTAL,
  inputCol: {
    span: 1
  }
};

const renderInputLabel = (label, labelCol, verticalLayout) => {
  if (label) {
    return (
      <div className="input-label"
           style={!verticalLayout && labelCol && {
             flex: labelCol.span,
             width: labelCol.width
           }}>
        {label}
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

const renderInputContainer = (inputValue, inputCol, verticalLayout, validateStatus, validateMessage) => {
  return (
    <div className={classNames('input-container',
                              {
                                'has-validate-icon': validateStatus && ValidateStatusIcons[validateStatus]
                              })}
         style={!verticalLayout && inputCol && {
           flex: inputCol.span,
           width: inputCol.width
         }}>
      <Input value={inputValue}/>
      {renderValidateIcon(validateStatus)}
      {renderValidateMessage(validateMessage)}
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

const AppInput = forwardRef((props, ref) => {
  const [componentId] = useState(() => Generator.uniqueId('AppInput_'));
  const [validationInfo, setValidationInfo] = useState(() => ({
    status: props.validateStatus,
    message: props.validateMessage
  }));

  useEffect(() => {
    setValidationInfo({
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

  useImperativeHandle(onRefChanged, () => ({
    _componentId: componentId,
    validate: () => {
      console.log('INPUT VALIDATED');
    }
  }), [componentId]);

  const className = classNames(
    'app-input',
    {
      'app-input-success': validationInfo.status === ValidateStatus.SUCCESS,
      'app-input-warning': validationInfo.status === ValidateStatus.WARNING,
      'app-input-error': validationInfo.status === ValidateStatus.ERROR,
    }
  );

  const isLayoutVertical = props.layoutDirection === LayoutDirection.VERTICAL;

  const inputStyle = {
    flexDirection: props.layoutDirection
  };

  return (
    <div {...fromBaseProps({className: className, style: inputStyle}, props)}>
      {renderInputLabel(props.label, props.labelCol, isLayoutVertical)}
      {renderInputContainer(props.value, props.inputCol, isLayoutVertical, props.validateStatus, props.validateMessage)}
    </div>
  );
});

AppInput.propTypes = propTypes;

AppInput.defaultProps = defaultProps;

export default AppInput;