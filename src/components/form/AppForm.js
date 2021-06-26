import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { ConsoleLogger } from '../../utils/loggers';
import './AppForm.scss';

const propTypes = {
  ...baseProps,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onValidationError: PropTypes.func,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
};

const defaultProps = {
  data: {},
  onSubmit: (data) => {},
  onValidationError: (errors) => {},
  layout: 'horizontal'
};

const handleFormValidationError = (error) => {
  ConsoleLogger.error('FORM VALIDATION ERROR', error);
};

const AppForm = (props) => {
  const [validating, setValidating] = useState(false);
  const inputRefs = useRef({});

  const addInputRef = useCallback((ref, componentId) => {
    if (ref) {
      inputRefs.current[componentId] = ref;
    } else {
      delete inputRefs.current[componentId];
    }
  }, []);

  const validateFormInputs = async () => {
    setValidating(true);
    let validateResultPromises = [];
    for (const refKey in inputRefs.current) {
      validateResultPromises.push(inputRefs.current[refKey].validate());
    }
    try {
      let validateResults = await Promise.all(validateResultPromises);
      setValidating(false);
      return validateResults.every(Boolean);
    } catch (error) {
      handleFormValidationError(error);
      return false;
    }
  };

  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (validating) {
      return;
    }
    let formValid = await validateFormInputs();
    console.log('FORM VALIDATION RESULT', formValid);
  }, [validating]);

  return (
    <form {...fromBaseProps({ className: 'app-form' }, props)}
          onSubmit={handleFormSubmit}>
      {props.children(addInputRef)}
    </form>
  );
};

AppForm.propTypes = propTypes;

AppForm.defaultProps = defaultProps;

export default AppForm;