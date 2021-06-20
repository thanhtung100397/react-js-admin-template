import React from "react";
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.data);
  }

  return (
    <form {...fromBaseProps({ className: 'app-form' }, props)}
          onSubmit={handleFormSubmit}>
      {props.children}
    </form>
  )
};

AppForm.propTypes = propTypes;

AppForm.defaultProps = defaultProps;

export default AppForm;