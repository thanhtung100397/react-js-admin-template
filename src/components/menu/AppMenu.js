import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../base';
import styled, { createGlobalStyle } from 'styled-components';
import { Menu } from 'antd';
import AppLink from '../typography/link/AppLink';
import { stringJoin } from '../../utils/stringHelpers';
import { ArrayHelpers } from '../../utils/arrayHelpers';
import { getThemeStylesFromProps } from '../../utils/themeHelpers';
import './AppMenu.scss';

export const MenuDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const ExpandDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const ThemeMode = {
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
  selected: PropTypes.bool
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
  themeMode: PropTypes.oneOf(Object.keys(ThemeMode).map(key => ThemeMode[key])),
  items: PropTypes.arrayOf(PropTypes.shape(MenuItemGroupPropTypes)),
  allowMultiSelect: PropTypes.bool,
  expandCurrentOnly: PropTypes.bool,
  expandAll: PropTypes.bool,
  expandAllLevel: PropTypes.number,
  onItemExpandChanged: PropTypes.func, // (menuItem, isExpanded: (boolean), itemKey) => {}
  onItemSelectChanged: PropTypes.func, // (menuItem, isSelected: (boolean), itemKey) => {}
};

const defaultProps = {
  direction: MenuDirection.VERTICAL,
  expandDirection: ExpandDirection.VERTICAL,
  themeMode: ThemeMode.LIGHT,
  items: [],
  allowMultiSelect: false,
};

const subMenu = (item, key, disabled) => (
  <Menu.SubMenu className="app-sub-menu" key={key}
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

const menuItem = (item, key, disabled) => {
  const itemContent = item.content || item.title;
  return (
    <Menu.Item className="app-menu-item" key={key}
               title={item.title} icon={item.icon} disabled={disabled}>
      {
        item.path? menuItemLink(item.path, itemContent) : itemContent
      }
    </Menu.Item>
  );
};

const menuItemLink = (path, content) => {
  return (
    <AppLink href={path}>
      {content}
    </AppLink>
  )
};

function generateMenuItemKey(index, parentKey) {
  return stringJoin('.', parentKey, index + 1);
}

function isMenuItemExpandable(menuItem, itemType, itemLevel, props) {
  if (itemType === MenuItemType.SUB_MENU) {
    if (menuItem.expanded) {
      return true;
    }
    if (props.expandAll && (!props.expandAllLevel || props.expandAllLevel >= itemLevel)) {
      return true;
    }
  }
  return false;
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

function forEachMenuItems(menuItems, onEachItem = (item, itemKey, itemType, itemLevel) => {},
                          parentKey, itemLevel = 1) {
  return menuItems?.forEach((menuItem, index) => {
    if (menuItem) {
      onEachMenuItem(menuItem, index, parentKey, itemLevel, onEachItem);
    }
  });
}

function onEachMenuItem(menuItem, index = 0, parentKey, itemLevel = 1,
                        onEachItem = (item, itemKey, itemType, itemLevel) => {}) {
  const { type = MenuItemType.ITEM, children } = menuItem;
  const itemKey = generateMenuItemKey(index, parentKey);
  onEachItem(menuItem, itemKey, type, itemLevel);
  switch (type) {
    case MenuItemType.SUB_MENU:
    case MenuItemType.ITEM_GROUP:
      forEachMenuItems(children, onEachItem, itemKey, itemLevel + 1);
      break;

    default:
      break;
  }
}

const AppMenu = (props) => {
  const [menuItemKeyMap, setMenuItemKeyMap] = useState();
  const [menuItemKeyPathMap, setMenuItemKeyPathMap] = useState();
  const [expandedMenuKeys, setExpandedMenuKeys] = useState();
  const [selectedMenuKeys, setSelectedMenuKeys] = useState();

  const location = useLocation();

  useEffect(() => {
    if (props.items) {
      const menuItemKeyMap = {};
      const menuItemKeyPathMap = {};
      const expandedMenuKeys = [];
      forEachMenuItems(props.items, (menuItem, itemKey, itemType, itemLevel) => {
        menuItemKeyMap[itemKey] = menuItem;
        if (menuItem.path) {
          menuItemKeyPathMap[menuItem.path] = itemKey;
        }
        if (isMenuItemExpandable(menuItem, itemType, itemLevel, props)) {
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
    let expandedKeys = keys;
    const newExpandedKeysSet = new Set(expandedKeys);
    const collapsedKeys = [];
    expandedMenuKeys.forEach((menuKey) => {
      if (newExpandedKeysSet.has(menuKey)) {
        newExpandedKeysSet.delete(menuKey);
      } else {
        collapsedKeys.push(menuKey);
      }
    });
    if (props.expandCurrentOnly && !props.allowMultiSelect && newExpandedKeysSet.size) {
      const [onlyExpandedMenuKey] = newExpandedKeysSet;
      expandedKeys = expandedKeys.reduce((prev, curr) => {
        if (onlyExpandedMenuKey.startsWith(curr)) {
          prev.push(curr);
        } else {
          collapsedKeys.push(curr);
        }
        return prev;
      }, []);
    }
    if (props.onItemExpandChanged) {
      newExpandedKeysSet.forEach((expandedKey) => {
        props.onItemExpandChanged(menuItemKeyMap[expandedKey], true, expandedKey);
      });
      collapsedKeys.forEach((collapsedKey) => {
        props.onItemExpandChanged(menuItemKeyMap[collapsedKey], false, collapsedKey);
      });
    }
    setExpandedMenuKeys(expandedKeys);
  };

  const createMenuItemSelectChangedHandler = (isSelected) => {
    return ({ key }) => {
      const menuItem = menuItemKeyMap[key];
      let newSelectedMenuKeys;
      if (props.allowMultiSelect) {
        newSelectedMenuKeys = isSelected?
          ArrayHelpers.addValues(selectedMenuKeys, key) :
          ArrayHelpers.removeValue(selectedMenuKeys, key);
        if (props.onItemSelectChanged) {
          props.onItemSelectChanged(menuItem, isSelected, key);
        }
      } else {
        newSelectedMenuKeys = [key]; // not allow to de-select menu item in single selection mode
        if (isSelected && props.onItemSelectChanged) {
          props.onItemSelectChanged(menuItem, true, key);
          selectedMenuKeys?.forEach((itemKey) => {
            props.onItemSelectChanged(menuItemKeyMap[itemKey], false, itemKey);
          })
        }
      }
      setSelectedMenuKeys(newSelectedMenuKeys);
    }
  };

  const onMenuItemSelected = createMenuItemSelectChangedHandler(true);

  const onMenuItemDeselected = createMenuItemSelectChangedHandler(false);

  useEffect(() => {
    if (menuItemKeyPathMap) {
      const selectedKey = menuItemKeyPathMap[location.pathname];
      if (selectedKey) {
        onMenuItemSelected({
          key: selectedKey
        });
      }
    }
  }, [location, menuItemKeyPathMap]);

  const appMenuClassNames = classNames('app-menu', {
    'app-menu-light-mode': props.themeMode === ThemeMode.LIGHT,
    'app-menu-dark-mode': props.themeMode === ThemeMode.DARK,
  });

  return (
    // DO NOT use 'theme' prop of ant menu, it will conflict with 'theme' prop of styled component ThemeProvider
    <>
      <PopupTheme/>
      <Root {...fromBaseProps({ className: appMenuClassNames }, props)}
            mode={menuMode} multiple={props.allowMultiSelect}
            openKeys={expandedMenuKeys} onOpenChange={onMenuExpandedChanged}
            selectedKeys={selectedMenuKeys} onSelect={onMenuItemSelected} onDeselect={onMenuItemDeselected}>
        {menuItemsNode}
      </Root>
    </>
  );
};

const getThemeStylesByMode = (props, themeMode, path, defaultValue) => {
  return getThemeStylesFromProps(props, `components.menu.${themeMode}.${path}`, defaultValue)
};

const PopupTheme = createGlobalStyle`
  .ant-menu-submenu-popup {
    .ant-menu-sub {
      ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup')}
    
      .app-menu-item {
        color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.item.text')?.color};
        
        .ant-menu-title-content {
          ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.item.text')}
        
          .app-typography {
            color: inherit;
          }
        }
      
        &:hover {
          ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.item.on_hover')}
        }
        
        &.ant-menu-item-active {
          color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.item.on_hover.text')?.color};
          
          .ant-menu-title-content {
            ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.item.on_hover.text')}
            
            .app-typography {
              color: inherit;
            }
          }
        }
      }
      
      .app-menu-item-group {    
        .ant-menu-item-group-title {
          color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.item_group.text')?.color};
          ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.item_group')}
        }
      }
      
      .ant-menu-submenu {
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu')}
      
        .ant-menu-submenu-title {
          color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu.text')?.color};
          
          .ant-menu-submenu-arrow {
            color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu.text')?.color};
          }
          
          &:hover {
            color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu.on_hover.text')?.color};
            ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu.on_hover')}
            
            .ant-menu-submenu-arrow {
              color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu.on_hover.text')?.color};
            }
          }
        }
      
        .ant-menu-sub {
          color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu.text')?.color};
          ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'popup.sub_menu')}
        }
      }
    }
  }
`

const Root = styled(Menu)`
  ${props => getThemeStylesFromProps(props, 'components.menu')}

  &.app-menu-dark-mode {
    .app-menu-item {
      color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.text')?.color};
      ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item')}

      .ant-menu-title-content {
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.text')}
      
        .app-typography {
          color: inherit;
        }
      }
      
      &:hover {
        color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_hover.text')?.color};
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_hover')}
      }
      
      &.ant-menu-item-active {
        color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_hover.text')?.color};
      }
    }
    
    &.ant-menu-horizontal {
      border-bottom: none;
    }
    
    &:not(.ant-menu-horizontal) {
      .app-menu-item::after {
        border-color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_select.badge')?.color};
      }
    }
    
    .app-menu-item-group {    
      .ant-menu-item-group-title {
        color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item_group.text')?.color};
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item_group')}
      }
    }
  
    .app-sub-menu {
      ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu')}
    
      .ant-menu-submenu-title {
        color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu.text')?.color};
        
        .ant-menu-submenu-arrow {
          color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu.text')?.color};
        }
        
        &:hover {
          color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu.on_hover.text')?.color};
          ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu.on_hover')}
          
          .ant-menu-submenu-arrow {
            color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu.on_hover.text')?.color};
          }
        }
      }
    
      .ant-menu-sub {
        color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu.text')?.color};
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'sub_menu')}
      }
    }
  
    &:not(.ant-menu-horizontal) {
      .ant-menu-item-selected {
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_select')}
      }
    }
  
    .ant-menu-item-selected {
      color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_select.text')?.color};
      ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_select')}
      
      .ant-menu-title-content {
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_select.text')}
      
        .app-typography {
          color: inherit;
        }
      }
    }
    
    .ant-menu-item-active {
      color: ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_hover.text')?.color};
      ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_hover')}
      
      .ant-menu-title-content {
        ${props => getThemeStylesByMode(props, ThemeMode.DARK, 'item.on_hover.text')}
      
        .app-typography {
          color: inherit;
        }
      }
    }
  }
`;

AppMenu.propTypes = propTypes;

AppMenu.defaultProps = defaultProps;

export default AppMenu;