import React from 'react';
import { MenuItemType } from '../../components/menu/AppMenu';
import { Icons } from './assets/icons';

export const uiMenu = [
  {
    title: 'App Typography',
    icon: <Icons.TypographyOutlined/>,
    type: MenuItemType.SUB_MENU,
    children: [
      {
        title: 'App Title',
        icon: <Icons.TitleOutlined/>,
        _component: React.lazy(() => import('./previewSections/typography/title/TitlePreview'))
      },
      {
        title: 'App Text',
        icon: <Icons.TextOutlined/>,
        _component: React.lazy(() => import('./previewSections/typography/text/TextPreview'))
      },
      {
        title: 'App Link',
        icon: <Icons.LinkOutlined/>,
        _component: React.lazy(() => import('./previewSections/typography/link/LinkPreview'))
      },
    ]
  },
  {
    title: 'App Input',
    icon: <Icons.InputOutlined/>,
    type: MenuItemType.SUB_MENU,
    children: [
      {
        title: 'App Text Input',
        icon: <Icons.TextInputOutlined/>,
      },
      {
        title: 'App Password Input',
        icon: <Icons.PasswordInputOutlined/>,
      },
      {
        title: 'App Text Area Input',
        icon: <Icons.TextAreaInputOutlined/>,
      },
      {
        title: 'App Number Input',
        icon: <Icons.NumberInputOutlined/>,
      },
    ]
  },
  {
    title: 'App Select',
    icon: <Icons.SelectOutlined/>,
  },
  {
    title: 'App Form',
    icon: <Icons.FormOutlined/>,
  },
  {
    title: 'App Button',
    icon: <Icons.ButtonOutlined/>,
  },
  {
    title: 'App Image',
    icon: <Icons.ImageOutlined/>,
  },
  {
    title: 'App Alert',
    icon: <Icons.AlertOutlined/>,
  },
  {
    title: 'App Color Picker',
    icon: <Icons.ColorOutlined/>,
  },
  {
    title: 'App Menu',
    icon: <Icons.MenuOutlined/>,
  },
];