import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../base';
import { TransformValueError, ValidateValueError, TriggerValidationError } from './AppFormItemErrors';
import { AppFormContext } from './AppForm';
import AppSpinner from '../spiner/AppSpinner';
import { CheckCircleTwoTone, WarningTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { ValidateStatus } from '../../constants/constants';
import { TypeChecker, Generator } from '../../utils/helpers';
import { ConsoleLogger } from '../../utils/loggers';
import colors from '../../colors.module.scss';
import './AppFormItem.scss';
import { ValidationRule } from '../../constants/validationRules';

const COMPONENT_ID_PREFIX = 'AppFormItem_';

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
  name: PropTypes.string,
  label: PropTypes.node,
  layoutDirection: PropTypes.oneOf(Object.keys(LayoutDirection).map((key) => LayoutDirection[key])),
  labelCol: PropTypes.exact({
    span: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  inputCol: PropTypes.exact({
    span: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  showSuccessValidateStatus: PropTypes.bool,
  validateStatus: PropTypes.oneOf(Object.keys(ValidateStatus).map((key) => ValidateStatus[key])),
  validateMessage: PropTypes.node,
  validateRules: PropTypes.arrayOf(PropTypes.shape({
    transform: PropTypes.func, // (value) => {} support async/Promise
    trigger: PropTypes.func, // (value, valid, transformValue) => {} support async/Promise
    validate: PropTypes.func, // (value) => {} support async/Promise
    message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) // node || (value) => {}
  }))
};

const defaultProps = {
  layoutDirection: LayoutDirection.HORIZONTAL,
  inputCol: {
    span: 1
  },
  showSuccessValidateStatus: false
};

const AppFormItemContext = React.createContext();

const renderAsteriskSign = (props) => {
  if (props.validateRules?.includes(ValidationRule.REQUIRED)) {
    return (
      <span className="asterisk-sign">*</span>
    );
  }
};

const renderLabel = (props, verticalLayout) => {
  if (props.label) {
    return (
      <div className="input-label"
           style={!verticalLayout && props.labelCol && {
             flex: props.labelCol.span,
             width: props.labelCol.width
           }}>
        {renderAsteriskSign(props)} {props.label}
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

const renderContainer = (props, verticalLayout, inputRef, validation) => {
  return (
    <div className={classNames('input-container',
                              {
                                'has-validate-icon': validation.status && ValidateStatusIcons[validation.status]
                              })}
         style={!verticalLayout && props.inputCol && {
           flex: props.inputCol.span,
           width: props.inputCol.width
         }}>
      {props.children}
      {renderValidateIcon(validation.status)}
      {renderValidateMessage(validation.message)}
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
    try {
      let result = transformFunc(inputValue);
      if (TypeChecker.isPromise(result)) {
        return await result;
      }
      return result;
    } catch (error) {
      throw new TransformValueError(error);
    }
  }
  return inputValue;
};

const validateValue = async (inputValue, validateFunc) => {
  if (validateFunc) {
    try {
      let result = validateFunc(inputValue);
      if (TypeChecker.isPromise(result)) {
        return await result;
      }
      return result;
    } catch (error) {
      throw new ValidateValueError(error);
    }
  }
  return false;
};

const triggerValidation = async (inputValue, validateResult, transformedValue, triggerFunc) => {
  if (triggerFunc) {
    try {
      let result = triggerFunc(inputValue, validateResult, transformedValue);
      if (TypeChecker.isPromise(result)) {
        await result;
      }
    } catch (error) {
      throw new TriggerValidationError(error);
    }
  }
}

const validateRule = async (inputValue, rule) => {
  let transformedValue = await transformValue(inputValue, rule.transform);
  let validateResult = await validateValue(transformedValue, rule.validate);
  await triggerValidation(inputValue, validateResult, transformedValue, rule.trigger);
  return validateResult;
};

const validateAllRules = async (inputValue, validateStatus, validateMessage, validateRules) => {
  let validateResult = {
    valid: true,
    message: undefined
  };
  if (validateStatus && validateStatus !== ValidateStatus.WARNING) {
    validateResult.valid = validateStatus === ValidateStatus.SUCCESS;
    validateResult.message = createValidationMessage(inputValue, validateMessage);
  } else if (validateRules) {
    for (const rule of validateRules) {
      try {
        if (!await validateRule(inputValue, rule)) {
          validateResult.valid = false;
          validateResult.message = createValidationMessage(inputValue, rule.message);
          break;
        }
      } catch (error) {
        ConsoleLogger.error(error.message, error.cause || error)
        validateResult.valid = false;
        validateResult.message = createValidationMessage(inputValue, error.message);
        break;
      }

    }
  }
  return validateResult;
};

const getInputValue = (inputRef) => {
  return inputRef.current?.getValue && inputRef.current?.getValue();
};

const disableInput = (inputRef, disabled) => {
  inputRef.current?.disable && inputRef.current?.disable(disabled);
}

const createValidationMessage = (inputValue, message) => {
  return TypeChecker.isFunction(message)? message(inputValue) : message;
};

const AppFormItem = (props) => {
  const [componentId] = useState(() => Generator.uniqueId(COMPONENT_ID_PREFIX));
  const { updateFormItemRef } = useContext(AppFormContext);
  const [contextValue, setContextValue] = useState({});
  const [validation, setValidation] = useState({});
  const inputRef = useRef({});

  useEffect(() => {
    setContextValue({
      setInputRef: (ref) => {
        inputRef.current = ref;
      }
    })
  }, []);

  useEffect(() => {
    setValidation({
      status: props.validateStatus,
      message: props.validateMessage
    });
  }, [props.validateStatus, props.validateMessage]);

  const validate = useCallback(async () => {
    setValidation({
      status: ValidateStatus.VALIDATING
    });
    disableInput(inputRef, true);
    let inputValue = getInputValue(inputRef);
    let validateResult = await validateAllRules(inputValue, props.validateStatus, props.validateMessage, props.validateRules);
    disableInput(inputRef, false);
    if (validateResult.valid) {
      if (props.showSuccessValidateStatus) {
        setValidation({
          status: ValidateStatus.SUCCESS
        });
      } else {
        setValidation({});
      }
    } else {
      setValidation({
        status: ValidateStatus.ERROR,
        message: validateResult.message
      })
    }
    return validateResult.valid;
  }, [props.showSuccessValidateStatus, props.validateStatus, props.validateMessage, props.validateRules]);

  useEffect(() => {
    updateFormItemRef && updateFormItemRef(props.name, {
      getValue: () => getInputValue(inputRef),
      validate: validate
    }, componentId);
    return () => {
      updateFormItemRef && updateFormItemRef(props.name, null, componentId);
    }
  }, [updateFormItemRef, validate, props.name, componentId]);

  const className = classNames(
    'app-form-item',
    {
      'validate-success': validation.status === ValidateStatus.SUCCESS,
      'validate-warning': validation.status === ValidateStatus.WARNING,
      'validate-error': validation.status === ValidateStatus.ERROR,
      'validate-validating': validation.status === ValidateStatus.VALIDATING,
    }
  );

  const isLayoutVertical = props.layoutDirection === LayoutDirection.VERTICAL;

  const style = {
    flexDirection: props.layoutDirection
  };

  return (
    <AppFormItemContext.Provider value={contextValue}>
      <div {...fromBaseProps({ className: className, style: style }, props)}>
        {renderLabel(props, isLayoutVertical)}
        {renderContainer(props, isLayoutVertical, inputRef, validation)}
      </div>
    </AppFormItemContext.Provider>
  );
};

AppFormItem.propTypes = propTypes;

AppFormItem.defaultProps = defaultProps;

export default AppFormItem;
export {
  AppFormItemContext
}