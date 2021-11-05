import React from 'react';
import { FormattedMessage } from 'react-intl';
import { MenuItemType } from '../../components/menu/AppMenu';
import { Icons } from '../../assets/icons';

export const appMenu = [
  {
    title: <FormattedMessage id="ID_DASHBOARD"/>,
  },
  {
    title: <FormattedMessage id="ID_USER_MANAGEMENT"/>,
    icon: <Icons.UserOutlined/>,
    type: MenuItemType.SUB_MENU,
    children: [
      {
        title: <FormattedMessage id="ID_LIST_USERS"/>,
        icon: <Icons.SolutionOutlined/>
      },
      {
        title: <FormattedMessage id="ID_CREATE_USER"/>,
        icon: <Icons.UserAddOutlined/>
      }
    ]
  },
  {
    title: <FormattedMessage id="ID_PRODUCT_MANAGEMENT"/>,
    icon: <Icons.AppstoreOutlined/>,
    type: MenuItemType.SUB_MENU,
    children: [
      {
        title: <FormattedMessage id="ID_LIST_PRODUCTS"/>,
        icon: <Icons.BarChartOutlined/>
      },
      {
        title: <FormattedMessage id="ID_CREATE_PRODUCT"/>,
        icon: <Icons.PlusCircleOutlined/>
      }
    ]
  }
];