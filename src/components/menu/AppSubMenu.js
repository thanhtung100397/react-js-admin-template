import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { Menu } from 'antd';
import './AppSubMenu.scss';

const propTypes = {
  ...baseProps,
  title: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  popupClassName: PropTypes.string,
  popupOffset: PropTypes.number,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: () => {}
};

const AppSubMenu = (props) => {
  return (
    <Menu.SubMenu {...fromBaseProps({ className: 'app-sub-menu' }, props)}
                  title={props.title} icon={props.icon} disabled={props.disabled}
                  popupClassName={props.popupClassName} popupOffet={props.popupOffset}
                  onTitleClick={props.onClick}>
      {props.children}
    </Menu.SubMenu>
  )
};

AppSubMenu.propTypes = propTypes;

AppSubMenu.defaultProps = defaultProps;

export default AppSubMenu;
