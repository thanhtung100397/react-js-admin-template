import React from 'react';
import { MenuItemType } from '../../components/menu/AppMenu';
import { Icons } from '../../assets/icons';

export const uiPreviewMenu = [
  {
    title: 'General',
    icon: <Icons.Boxes/>,
    type: MenuItemType.SUB_MENU,
    children: [
      {
        title: <FormattedMessage id="ID_LIST_PRODUCTS"/>,
        icon: <Icons.List/>,
        path: routes.DASHBOARD.children.LIST_PRODUCTS.path,

      },
      {
        title: <FormattedMessage id="ID_CREATE_PRODUCT"/>,
        icon: <Icons.Box/>,
        path: routes.DASHBOARD.children.ADD_PRODUCT.path
      }
    ]
  },
  {
    title: <FormattedMessage id="ID_USER_MANAGEMENT"/>,
    icon: <Icons.UserGroups/>,
    type: MenuItemType.SUB_MENU,
    children: [
      {
        title: <FormattedMessage id="ID_LIST_USERS"/>,
        icon: <Icons.List/>,
        path: routes.DASHBOARD.children.LIST_USERS.path
      },
      {
        title: <FormattedMessage id="ID_CREATE_USER"/>,
        icon: <Icons.UserAdd/>,
        path: routes.DASHBOARD.children.ADD_USER.path
      }
    ]
  },
];