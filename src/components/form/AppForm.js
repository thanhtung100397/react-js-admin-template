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
    let result = true;
    for (const refKey in inputRefs.current) {
      let inputValid = await inputRefs.current[refKey].validate();
      result = result && inputValid;
    }
    setValidating(false);
    return result;
  };

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    if (validating) {
      return;
    }
    validateFormInputs()
      .then((validInputs) => {
        console.log('FORM VALIDATION RESULT', validInputs);
      })
      .catch(handleFormValidationError);
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