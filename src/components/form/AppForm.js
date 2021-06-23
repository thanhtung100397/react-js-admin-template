import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
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

const AppForm = (props) => {
  const inputRefs = useRef([]);

  const addInputRef = useCallback((ref, componentId) => {
    if (ref) {
      inputRefs.current[componentId] = ref;
    } else {
      delete inputRefs.current[componentId];
    }
    console.log(inputRefs.current);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.data);
  };

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