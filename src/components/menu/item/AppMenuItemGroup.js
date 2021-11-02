import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../base';
import { Menu } from 'antd';
import './AppMenuItemGroup.scss';

const propTypes = {
  ...baseProps,
  title: PropTypes.string
};

const defaultProps = {

};

const AppMenuItemGroup = (props) => {
  return (
    <Menu.ItemGroup {...fromBaseProps({ className: 'app-menu-item-group' }, props)}
                    title={props.title}>
      {props.children}
    </Menu.ItemGroup>
  )
};

AppMenuItemGroup.propTypes = propTypes;

AppMenuItemGroup.defaultProps = defaultProps;

export default AppMenuItemGroup;
