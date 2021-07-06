import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { Button } from 'antd';
import './AppButton.scss';

const propTypes = {
  ...baseProps,
  type: PropTypes.oneOf(['primary', 'dashed', 'link', 'text', 'default']),
  ghost: PropTypes.bool,
  danger: PropTypes.bool,
  htmlType: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top', 'framename']),
  icon: PropTypes.node,
  loading: PropTypes.bool,
  shape: PropTypes.oneOf(['circle', 'round']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

const defaultProps = {
};

const AppButton = (props) => {
  return (
    <Button {...fromBaseProps({ className: 'app-button' }, props)}
            type={props.type} ghost={props.ghost} htmlType={props.htmlType} href={props.href} target={props.target}
            icon={props.icon} loading={props.loading} shape={props.shape} disabled={props.disabled}
            onClick={props.onClick}>
      {props.children}
    </Button>
  )
};

AppButton.propTypes = propTypes;

AppButton.defaultProps = defaultProps;

export default AppButton;