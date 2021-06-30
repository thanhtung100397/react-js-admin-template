import React, { useRef, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { ConsoleLogger } from '../../utils/loggers';
import AppFormItem from './AppFormItem';
import './AppForm.scss';
import { setObjValue } from '../../utils/helpers';

const propTypes = {
  ...baseProps,
  data: PropTypes.object,
  onSubmit: PropTypes.func, // (data) => {}
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
};

const defaultProps = {
  data: {},
  onSubmit: (data) => {},
  layout: 'horizontal'
};

const AppFormContext = React.createContext({});

const handleFormValidationError = (error) => {
  ConsoleLogger.error('FORM VALIDATION ERROR', error);
};

const collectFormData = (itemRefs) => {
  let result = {};
  Object.keys(itemRefs.current)
    .forEach((itemKey) => {
      let item = itemRefs.current[itemKey];
      if (item.name) {
        setObjValue(result, item.name, item.ref.getValue())
      }
    });
  return result;
};

const AppForm = (props) => {
  const { onSubmit, ...otherProps } = props;
  const [contextValue, setContextValue] = useState({});
  const [validating, setValidating] = useState(false);
  const formItemRefs = useRef({});

  useEffect(() => {
    setContextValue({
      updateFormItemRef: (name, ref, componentId) => {
        if (ref) {
          formItemRefs.current[componentId] = {
            name: name,
            ref: ref
          };
        } else {
          delete formItemRefs.current[componentId];
        }
      }
    })
  }, []);

  const validateFormInputs = async () => {
    setValidating(true);
    let validateResultPromises = [];
    for (const itemKey in formItemRefs.current) {
      validateResultPromises.push(formItemRefs.current[itemKey].ref.validate());
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
    if (formValid) {
      onSubmit && onSubmit(collectFormData(formItemRefs));
    }
  }, [validating, onSubmit]);

  return (
    <AppFormContext.Provider value={contextValue}>
      <form {...fromBaseProps({ className: 'app-form' }, otherProps)}
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