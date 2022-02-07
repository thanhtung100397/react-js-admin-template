import React from 'react';
import { MenuItemType } from '../../components/menu/AppMenu';
import { Icons } from './assets/icons';

export const uiMenu = [
  {
    title: 'Typography',
    icon: <Icons.TypographyOutlined/>,
    type: MenuItemType.SUB_MENU,
    children: [
      {
        title: 'Title',
        icon: <Icons.TitleOutlined/>,
      },
      {
        title: 'Text',
        icon: <Icons.TextOutlined/>,
      },
      {
        title: 'Link',
        icon: <Icons.LinkOutlined/>,
      },
    ]
  }
];