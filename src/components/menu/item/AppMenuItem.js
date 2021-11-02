import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../base';
import { Menu } from 'antd';
import './AppMenuItem.scss';

const propTypes = {
  ...baseProps,
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool
};

const defaultProps = {
};

const AppMenuItem = (props) => {
  return (
    <Menu.Item {...fromBaseProps({ className: 'app-menu-item' }, props)}
               key={props.id} title={props.title}
               icon={props.icon} disabled={props.disabled}>
      {props.children}
    </Menu.Item>
  )
};

AppMenuItem.propTypes = propTypes;

AppMenuItem.defaultProps = defaultProps;

export default AppMenuItem;
