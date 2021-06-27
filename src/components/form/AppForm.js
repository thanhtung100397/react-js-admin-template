import React, { useRef, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { ConsoleLogger } from '../../utils/loggers';
import AppFormItem from './AppFormItem';
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

const AppFormContext = React.createContext({});

const handleFormValidationError = (error) => {
  ConsoleLogger.error('FORM VALIDATION ERROR', error);
};

const AppForm = (props) => {
  const [contextValue, setContextValue] = useState({});
  const [validating, setValidating] = useState(false);
  const formItemRefs = useRef({});

  useEffect(() => {
    setContextValue({
      updateFormItemRef: (ref, componentId) => {
        if (ref) {
          formItemRefs.current[componentId] = ref;
        } else {
          delete formItemRefs.current[componentId];
        }
      }
    })
  }, []);

  const validateFormInputs = async () => {
    setValidating(true);
    let validateResultPromises = [];
    for (const refKey in formItemRefs.current) {
      validateResultPromises.push(formItemRefs.current[refKey].validate());
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
    <AppFormContext.Provider value={contextValue}>
      <form {...fromBaseProps({ className: 'app-form' }, props)}
            onSubmit={handleFormSubmit}>
        {props.children}
      </form>
    </AppFormContext.Provider>
  );
};

AppForm.propTypes = propTypes;

AppForm.defaultProps = defaultProps;

AppForm.Item = (props) => <AppFormItem {...props}/>

export default AppForm;
export {
  AppFormContext
}