import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { Alert } from 'antd';
import './AppAlert.scss';

const AlertType = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
};

const propTypes = {
  ...baseProps,
  message: PropTypes.node,
  description: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(AlertType).map((key) => AlertType[key])),
  action: PropTypes.node,
  onClose: PropTypes.func,
  afterClose: PropTypes.func,
  banner: PropTypes.bool,
  closable: PropTypes.bool,
  closeText: PropTypes.node,
  showIcon: PropTypes.bool,
  icon: PropTypes.node
};

const defaultProps = {
};

const AppAlert = (props) => {
  return (
    <Alert {...fromBaseProps({ className: 'app-alert' }, props)}
           message={props.message} description={props.description} type={props.type}
           action={props.action} onClose={props.onClose} afterClose={props.afterClose}
           baner={props.banner} closable={props.closable} closeText={props.closeText}
           showIcon={props.showIcon} icon={props.icon}/>
  );
};

AppAlert.propTypes = propTypes;

AppAlert.defaultProps = defaultProps;

export default AppAlert;