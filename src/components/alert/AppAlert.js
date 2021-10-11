import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { Alert } from 'antd';
import AppText from '../typography/text/AppText';
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
  autoTextColor: PropTypes.bool,
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
  autoTextColor: true
};

const appAlertText = (type, text) => {
  if (!text) {
    return;
  }
  return <AppText className={`alert-text-${type}`}>{text}</AppText>
};

const AppAlert = (props) => {

  const message = useMemo(() => {
    if (props.autoTextColor) {
      return appAlertText(props.type, props.message);
    }
    return props.message;
  }, [props.autoTextColor, props.type, props.message]);

  const description = useMemo(() => {
    if (props.autoTextColor) {
      return appAlertText(props.type, props.description);
    }
    return props.description;
  }, [props.autoTextColor, props.type, props.description]);

  return (
    <Alert {...fromBaseProps({ className: 'app-alert' }, props)}
           message={message} description={description} type={props.type}
           action={props.action} onClose={props.onClose} afterClose={props.afterClose}
           baner={props.banner} closable={props.closable} closeText={props.closeText}
           showIcon={props.showIcon} icon={props.icon}/>
  );
};

AppAlert.propTypes = propTypes;

AppAlert.defaultProps = defaultProps;

export default AppAlert;