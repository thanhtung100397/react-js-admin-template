import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Menu } from 'antd';
import AppMenuItem from './item/AppMenuItem';
import AppMenuItemGroup from './item/AppMenuItemGroup';
import AppSubMenu from './AppSubMenu';
import './AppMenu.scss';

export const MenuDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const ItemDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

const propTypes = {
  ...baseProps,
  direction: PropTypes.oneOf(Object.keys(MenuDirection).map(key => MenuDirection[key])),
  expandDirection: PropTypes.oneOf(Object.keys(ItemDirection).map(key => ItemDirection[key]))
};

const defaultProps = {
  direction: 'vertical',
  expandDirection: 'vertical'
};

const AppMenu = (props) => {

  const menuMode = useMemo(() => {
    if (props.expandDirection === ItemDirection.VERTICAL) {
      return 'inline'; // ant menu mode
    }
    if (props.direction) {
      return props.direction;
    }
  }, [props.direction, props.expandDirection]);

  return (
    <Menu {...fromBaseProps({ className: 'app-menu' }, props)}
          mode={menuMode}>
      {props.children}
    </Menu>
  );
};

AppMenu.propTypes = propTypes;

AppMenu.defaultProps = defaultProps;

AppMenu.Item = (props) => <AppMenuItem {...props}/>;
AppMenu.ItemGroup = (props) => <AppMenuItemGroup {...props}/>;
AppMenu.SubMenu = (props) => <AppSubMenu {...props}/>;

export default AppMenu;