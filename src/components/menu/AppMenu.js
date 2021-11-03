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

export const MenuItemType = {
  SUB_MENU: 'sub_menu',
  ITEM_GROUP: 'item_group',
  ITEM: 'item'
};

const MenuItemPropTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOfType(Object.keys(MenuItemType).map(key => MenuItemType[key])),
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  content: PropTypes.node
};

const propTypes = {
  ...baseProps,
  direction: PropTypes.oneOf(Object.keys(MenuDirection).map(key => MenuDirection[key])),
  expandDirection: PropTypes.oneOf(Object.keys(ItemDirection).map(key => ItemDirection[key])),
  items: PropTypes.arrayOf(PropTypes.shape({
    ...MenuItemShapePropTypes,
    children: PropTypes.shape(MenuItemPropTypes)
  }))
};

const defaultProps = {
  direction: 'vertical',
  expandDirection: 'vertical',
  items: []
};

const subMenu = (item, key, disabled) => (
  <Menu.SubMenu key={key} title={item.title} icon={item.icon} disabled={disabled}>
    {item.content}
    {renderMenuItems(item.children, key)}
  </Menu.SubMenu>
);

const menuItemGroup = (item, key, disabled) => (
  <Menu.ItemGroup title={item.title}>
    {item.content}
    {renderMenuItems(item.children, key)}
  </Menu.ItemGroup>
);

const menuItem = (item, key, disabled) => (
  <Menu.Item key={key} title={item.title} icon={item.icon} disabled={disabled}>
    {item.content || item.title}
  </Menu.Item>
);

const generateMenuItemKey = (index, parentKey) => {
  return `${parentKey}.${index + 1}`;
};

const renderMenuItem = (menuItem, index = 0, parentKey = "") => {
  const { type = MenuItemType.ITEM } = menuItem;
  switch (type) {
    case MenuItemType.SUB_MENU:
      return subMenu(menuItem, generateMenuItemKey(index, parentKey), menuItem.disabled);
    case MenuItemType.ITEM_GROUP:
      return menuItemGroup(menuItem, generateMenuItemKey(index, parentKey), menuItem.disabled);
    default:
      return menuItem(menuItem, generateMenuItemKey(index, parentKey), menuItem.disabled);
  }
};

function renderMenuItems(menuItems, parentKey = "") {
  menuItems.map((menuItem, index) => renderMenuItem(menuItem, index, parentKey));
}

const AppMenu = (props) => {

  const menuMode = useMemo(() => {
    if (props.expandDirection === ItemDirection.VERTICAL) {
      return 'inline'; // ant menu mode
    }
    if (props.direction) {
      return props.direction;
    }
  }, [props.direction, props.expandDirection]);

  const menuItems = useMemo(() => renderMenuItems(props.items), [props.items]);

  return (
    <Menu {...fromBaseProps({ className: 'app-menu' }, props)}
          mode={menuMode}>
      {menuItems}
    </Menu>
  );
};

AppMenu.propTypes = propTypes;

AppMenu.defaultProps = defaultProps;

AppMenu.Item = Menu.Item;
AppMenu.ItemGroup = (props) => <AppMenuItemGroup {...props}/>;
AppMenu.SubMenu = (props) => <AppSubMenu {...props}/>;

export default AppMenu;