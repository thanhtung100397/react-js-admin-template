import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Menu } from 'antd';
import { stringJoin } from '../../utils/stringHelpers';
import './AppMenu.scss';

export const MenuDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const ExpandDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const MenuTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const MenuItemType = {
  SUB_MENU: 'sub_menu',
  ITEM_GROUP: 'item_group',
  ITEM: 'item'
};

const MenuItemPropTypes = {
  title: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.keys(MenuItemType).map(key => MenuItemType[key])),
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  content: PropTypes.node
};

const MenuItemGroupPropTypes = {
  ...MenuItemPropTypes,
  children: PropTypes.arrayOf(PropTypes.shape(MenuItemPropTypes))
};

const propTypes = {
  ...baseProps,
  direction: PropTypes.oneOf(Object.keys(MenuDirection).map(key => MenuDirection[key])),
  expandDirection: PropTypes.oneOf(Object.keys(ExpandDirection).map(key => ExpandDirection[key])),
  theme: PropTypes.oneOf(Object.keys(MenuTheme).map(key => MenuTheme[key])),
  items: PropTypes.arrayOf(PropTypes.shape(MenuItemGroupPropTypes))
};

const defaultProps = {
  direction: MenuDirection.VERTICAL,
  expandDirection: ExpandDirection.VERTICAL,
  theme: MenuTheme.DARK,
  items: []
};

const subMenu = (item, key, disabled) => (
  <Menu.SubMenu className="app-menu-item" key={key}
                title={item.title} icon={item.icon} disabled={disabled}>
    {item.content}
    {renderMenuItems(item.children, key)}
  </Menu.SubMenu>
);

const menuItemGroup = (item, key, disabled) => (
  <Menu.ItemGroup className="app-menu-item-group" key={key} title={item.title}>
    {item.content}
    {renderMenuItems(item.children, key)}
  </Menu.ItemGroup>
);

const menuItem = (item, key, disabled) => (
  <Menu.Item className="app-menu-item" key={key}
             title={item.title} icon={item.icon} disabled={disabled}>
    {item.content || item.title}
  </Menu.Item>
);

function generateMenuItemKey(index, parentKey) {
  return stringJoin('.', parentKey, index + 1);
}

function renderMenuItem(item, index = 0, parentKey) {
  const { type = MenuItemType.ITEM } = item;
  switch (type) {
    case MenuItemType.SUB_MENU:
      return subMenu(item, generateMenuItemKey(index, parentKey), item.disabled);
    case MenuItemType.ITEM_GROUP:
      return menuItemGroup(item, generateMenuItemKey(index, parentKey), item.disabled);
    default:
      return menuItem(item, generateMenuItemKey(index, parentKey), item.disabled);
  }
}

function renderMenuItems(menuItems, parentKey = 1) {
  return menuItems.map((menuItem, index) => renderMenuItem(menuItem, index, parentKey));
}

const AppMenu = (props) => {

  const menuMode = useMemo(() => {
    if (props.expandDirection === ExpandDirection.VERTICAL &&
      props.direction === MenuDirection.VERTICAL) {
      return 'inline'; // ant menu mode
    }
    if (props.direction) {
      return props.direction;
    }
  }, [props.direction, props.expandDirection]);

  const menuItems = useMemo(() => renderMenuItems(props.items), [props.items]);

  return (
    <Menu {...fromBaseProps({ className: 'app-menu' }, props)}
          mode={menuMode} theme={props.theme}>
      {menuItems}
    </Menu>
  );
};

AppMenu.propTypes = propTypes;

AppMenu.defaultProps = defaultProps;

export default AppMenu;