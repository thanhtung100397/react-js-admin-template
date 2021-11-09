import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Menu } from 'antd';
import { stringJoin } from '../../utils/stringHelpers';
import { ArrayHelpers } from '../../utils/arrayHelpers';
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
  content: PropTypes.node,
  path: PropTypes.string,
};

const MenuItemGroupPropTypes = {
  ...MenuItemPropTypes,
  expanded: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.shape(MenuItemPropTypes))
};

const propTypes = {
  ...baseProps,
  direction: PropTypes.oneOf(Object.keys(MenuDirection).map(key => MenuDirection[key])),
  expandDirection: PropTypes.oneOf(Object.keys(ExpandDirection).map(key => ExpandDirection[key])),
  theme: PropTypes.oneOf(Object.keys(MenuTheme).map(key => MenuTheme[key])),
  items: PropTypes.arrayOf(PropTypes.shape(MenuItemGroupPropTypes)),
  allowMultiSelect: PropTypes.bool,
  expandCurrentOnly: PropTypes.bool,
  expandAll: PropTypes.bool,
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

function renderMenuItem(item, index = 0, parentKey,
                        onEachItem = (item, itemKey, itemType) => {}) {
  const { type = MenuItemType.ITEM } = item;
  const itemKey = generateMenuItemKey(index, parentKey);
  onEachItem(item, itemKey, type);
  switch (type) {
    case MenuItemType.SUB_MENU:
      return subMenu(item, itemKey, item.disabled);
    case MenuItemType.ITEM_GROUP:
      return menuItemGroup(item, itemKey, item.disabled);
    default:
      return menuItem(item, itemKey, item.disabled);
  }
}

function renderMenuItems(menuItems,
                         onEachItem = (item, itemKey, itemType) => {},
                         parentKey = 1) {
  return menuItems.map((menuItem, index) => renderMenuItem(menuItem, index, parentKey, onEachItem));
}

function forEachMenuItems(menuItems, onEachItem = (item, itemKey, itemType) => {}) {
  return menuItems.map((menuItem, index) => eachMenuItem(menuItem, index, ));
}

function eachMenuItem(menuItem, index = 0, parentKey,
                      onEachItem = (item, itemKey, itemType) => {}) {
  const { type = MenuItemType.ITEM } = item;
  const itemKey = generateMenuItemKey(index, parentKey);
  onEachItem(item, itemKey, type);
  switch (type) {
    case MenuItemType.SUB_MENU:
      return subMenu(item, itemKey, item.disabled);
    case MenuItemType.ITEM_GROUP:
      return menuItemGroup(item, itemKey, item.disabled);
    default:
      return menuItem(item, itemKey, item.disabled);
  }
}

const AppMenu = (props) => {

  const [menuKeyPathMap, setMenuKeyPathMap] = useState();
  const [expandedMenuKeys, setExpandedMenuKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState();

  const menuMode = useMemo(() => {
    if (props.expandDirection === ExpandDirection.VERTICAL &&
      props.direction === MenuDirection.VERTICAL) {
      return 'inline'; // ant menu mode
    }
    if (props.direction) {
      return props.direction;
    }
  }, [props.direction, props.expandDirection]);

  const menuItemsNode = useMemo(() => {
    const pathMap = {};
    const expandedKeys = [];
    const node = renderMenuItems(props.items, (menuItem, itemKey) => {
      pathMap[menuItem.path] = itemKey;
      if (menuItem.expanded) {
        expandedKeys.push(itemKey);
      }
    });
    setMenuKeyPathMap(pathMap);
    setExpandedMenuKeys(expandedKeys);
    return node;
  }, [props.items]);

  const handleExpandMenuChanged = useMemo(() => {
    if (!props.allowMultiSelect && props.expandCurrentOnly) {
      return (keys) => setExpandedMenuKeys((prev) => ArrayHelpers.nonIntersectValues(keys, prev));
    }
    return (keys) => setExpandedMenuKeys(keys);
  }, [props.expandCurrentOnly, props.allowMultiSelect]);

  const handleMenuItemSelected = ({item, key, keyPath}) => {
    console.log('ABC', item);
    console.log('DEF', key);
    console.log('GHI', keyPath);
  };

  return (
    <Menu {...fromBaseProps({ className: 'app-menu' }, props)}
          mode={menuMode} theme={props.theme} multiple={props.allowMultiSelect}
          openKeys={expandedMenuKeys} onOpenChange={handleExpandMenuChanged}
          selectedKeys={selectedKeys} onSelect={handleMenuItemSelected}>
      {menuItemsNode}
    </Menu>
  );
};

AppMenu.propTypes = propTypes;

AppMenu.defaultProps = defaultProps;

export default AppMenu;