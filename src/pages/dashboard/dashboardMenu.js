import React from 'react';
import { FormattedMessage } from 'react-intl';
import { MenuItemType } from '../../components/menu/AppMenu';
import { Icons } from '../../assets/icons';
import { routes } from '../../AppRoutes';

export const dashboardMenu = [
  {
    title: <FormattedMessage id="ID_DASHBOARD"/>,
    icon: <Icons.BubbleChart/>,
    path: routes.DASHBOARD.path
  },
  {
    title: <FormattedMessage id="ID_PRODUCT_MANAGEMENT"/>,
    icon: <Icons.Boxes/>,
    type: MenuItemType.SUB_MENU,
    expanded: true,
    children: [
      {
        title: <FormattedMessage id="ID_LIST_PRODUCTS"/>,
        icon: <Icons.List/>,
        path: routes.LIST_PRODUCTS.path,

      },
      {
        title: <FormattedMessage id="ID_CREATE_PRODUCT"/>,
        icon: <Icons.Box/>,
        path: routes.ADD_PRODUCT.path
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
        path: routes.LIST_USERS.path
      },
      {
        title: <FormattedMessage id="ID_CREATE_USER"/>,
        icon: <Icons.UserAdd/>,
        path: routes.ADD_USER.path
      }
    ]
  },
];