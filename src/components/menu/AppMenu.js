import React, { useMemo, useState, useEffect, useCallback } from 'react';
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
  selected: PropTypes.bool,
  onSelectChanged: PropTypes.func, // (menuItem, isSelected: (boolean), itemKey) => {}
};

const MenuItemGroupPropTypes = {
  ...MenuItemPropTypes,
  expanded: PropTypes.bool,
  onExpandChanged: PropTypes.func, // (menuItem, isExpanded: (boolean), itemKey) => {}
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
  onItemExpandChanged: PropTypes.func, // (menuItem, isExpanded: (boolean), itemKey) => {}
  onItemSelectChanged: PropTypes.func, // (menuItem, isSelected: (boolean), itemKey) => {}
};

const defaultProps = {
  direction: MenuDirection.VERTICAL,
  expandDirection: ExpandDirection.VERTICAL,
  theme: MenuTheme.DARK,
  items: [],
  allowMultiSelect: false,
  onItemExpandChanged: (menuItem, isExpanded, itemKey) => {},
  onItemSelectChanged: (menuItem, isSelected, itemKey) => {}
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

function getItemParentKeys(itemKey) {
  const levels = itemKey.split('.');
  if (levels.length > 1) {
    const parentLevels = levels.slice(0, levels.length - 1);
    return parentLevels.reduce((prev, curr) => {
      const parentKey = prev[prev.length - 1];
      if (parentKey) {
        prev.push(`${parentKey}.${curr}`);
      } else {
        prev.push(curr);
      }
      return prev;
    }, []);
  }
  return [];
}

function renderMenuItem(item, index = 0, parentKey) {
  const { type = MenuItemType.ITEM } = item;
  const itemKey = generateMenuItemKey(index, parentKey);
  switch (type) {
    case MenuItemType.SUB_MENU:
      return subMenu(item, itemKey, item.disabled);
    case MenuItemType.ITEM_GROUP:
      return menuItemGroup(item, itemKey, item.disabled);
    default:
      return menuItem(item, itemKey, item.disabled);
  }
}

function renderMenuItems(menuItems, parentKey) {
  return menuItems?.map((menuItem, index) => renderMenuItem(menuItem, index, parentKey));
}

function forEachMenuItems(menuItems, onEachItem = (item, itemKey, itemType) => {}, parentKey) {
  return menuItems?.forEach((menuItem, index) => {
    if (menuItem) {
      onEachMenuItem(menuItem, index, parentKey, onEachItem);
    }
  });
}

function onEachMenuItem(menuItem, index = 0, parentKey,
                        onEachItem = (item, itemKey, itemType) => {}) {
  const { type = MenuItemType.ITEM, children } = menuItem;
  const itemKey = generateMenuItemKey(index, parentKey);
  onEachItem(menuItem, itemKey, type);
  switch (type) {
    case MenuItemType.SUB_MENU:
    case MenuItemType.ITEM_GROUP:
      forEachMenuItems(children, onEachItem, itemKey);
      break;

    default:
      break;
  }
}



const AppMenu = (props) => {
  const { onItemSelectChanged, onItemExpandChanged } = props;

  const [menuItemKeyMap, setMenuItemKeyMap] = useState();
  const [menuItemKeyPathMap, setMenuItemKeyPathMap] = useState();
  const [expandedMenuKeys, setExpandedMenuKeys] = useState();
  const [selectedMenuKeys, setSelectedMenuKeys] = useState();

  useEffect(() => {
    if (props.items) {
      const menuItemKeyMap = {};
      const menuItemKeyPathMap = {};
      const expandedMenuKeys = [];
      forEachMenuItems(props.items, (menuItem, itemKey, itemType) => {
        menuItemKeyMap[itemKey] = menuItem;
        if (menuItem.path) {
          menuItemKeyPathMap[menuItem.path] = itemKey;
        }
        if (itemType === MenuItemType.SUB_MENU && (props.expandAll || menuItem.expanded)) {
          expandedMenuKeys.push(itemKey);
        }
      });
      setMenuItemKeyMap(menuItemKeyMap);
      setMenuItemKeyPathMap(menuItemKeyPathMap);
      setExpandedMenuKeys(expandedMenuKeys);
    }
  }, [props.items, props.expandAll]);

  const menuMode = useMemo(() => {
    if (props.expandDirection === ExpandDirection.VERTICAL &&
      props.direction === MenuDirection.VERTICAL) {
      return 'inline'; // ant menu mode
    }
    if (props.direction) {
      return props.direction;
    }
  }, [props.direction, props.expandDirection]);

  const menuItemsNode = useMemo(() => renderMenuItems(props.items), [props.items]);

  const onMenuExpandedChanged = (keys) => {
    let updatedExpandedMenuKeys = keys;
    const newExpandedKeys = ArrayHelpers.nonIntersectValues(updatedExpandedMenuKeys, expandedMenuKeys);
    if (!newExpandedKeys.length) {
      return;
    }
    if (props.expandCurrentOnly && !props.allowMultiSelect) {
      const currentItemKey = newExpandedKeys[0];
      const parentItemKeys = getItemParentKeys(currentItemKey);
      if (parentItemKeys.length) {
        updatedExpandedMenuKeys = parentItemKeys.concat(currentItemKey);
      } else {
        updatedExpandedMenuKeys = [currentItemKey];
      }
    }
    setExpandedMenuKeys(updatedExpandedMenuKeys);
  };

  const createMenuItemSelectChangedHandler = useCallback((isSelected) => {
    return ({ key }) => {
      const menuItem = menuItemKeyMap[key];
      if (menuItem && menuItem.onSelectChanged) {
        menuItem.onSelectChanged(menuItem, isSelected, key);
      }
      if (onItemSelectChanged) {
        onItemSelectChanged(menuItem, isSelected, key);
      }
      // if (isSelected) {
      //   setSelectedMenuKeys([...selectedMenuKeys, key]);
      // } else {
      //   setSelectedMenuKeys([...selectedMenuKeys]);
      // }
    }
  }, [menuItemKeyMap, onItemSelectChanged]);

  const onMenuItemSelected = useMemo(() => {
    return createMenuItemSelectChangedHandler(true);
  }, [createMenuItemSelectChangedHandler]);

  const onMenuItemDeselected = useMemo(() => {
    return createMenuItemSelectChangedHandler(false);
  }, [createMenuItemSelectChangedHandler]);

  return (
    <Menu {...fromBaseProps({ className: 'app-menu' }, props)}
          mode={menuMode} theme={props.theme} multiple={props.allowMultiSelect}
          openKeys={expandedMenuKeys} onOpenChange={onMenuExpandedChanged}
          selectedKeys={selectedMenuKeys} onSelect={onMenuItemSelected} onDeselect={onMenuItemDeselected}>
      {menuItemsNode}
    </Menu>
  );
};

AppMenu.propTypes = propTypes;

AppMenu.defaultProps = defaultProps;

export default AppMenu;