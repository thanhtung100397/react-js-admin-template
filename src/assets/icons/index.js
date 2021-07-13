import React from 'react';
import colors from '../../colors.module.scss';
import favicon from './favicon.ico';

import { ReactComponent as AppLogo } from "./ic_app_logo.svg";
import ic_app_logo from "./ic_app_logo.svg";

import ic_app_loading from "./ic_app_loading.svg";

import {
  UserOutlined,
  KeyOutlined,
  NumberOutlined
} from '@ant-design/icons';

const colorIconStyle = {
  color: colors.appPrimaryColorDark
};

export const Icons = {
  AppLogo,
  UserOutlined,
  KeyOutlined,
  NumberOutlined
};

export const ColorIcons = {
  UserOutlined: (props) => <UserOutlined style={colorIconStyle}/>,
  KeyOutlined: (props) => <KeyOutlined style={colorIconStyle}/>,
  NumberOutlined: (props) => <NumberOutlined style={colorIconStyle}/>
};

export const icons = {
  favicon,
  ic_app_logo,
  ic_app_loading
};