import React from 'react';
import colors from '../../colors.module.scss';
import favicon from './favicon.ico';

// assets icons import
import { ReactComponent as AppLogo } from "./ic_app_logo.svg";
import ic_app_logo from "./ic_app_logo.svg";
import ic_app_loading from "./ic_app_loading.svg";

// ant icons import
import {
  UserOutlined,
  KeyOutlined,
  NumberOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

// material design icons import
import {
  MdBubbleChart,
  MdGroups,
  MdList,
  MdPersonAdd,
  MdOutlineColorLens
} from 'react-icons/md';

// font awesome icons import
import {
  FaBoxes,
  FaBox
} from 'react-icons/fa'

const colorIconStyle = {
  color: colors.appPrimaryColorDark
};

export const Icons = {
  // assets component icons
  AppLogo,

  // solid component icons
  BubbleChart: MdBubbleChart,
  UserGroups: MdGroups,
  List: MdList,
  UserAdd: MdPersonAdd,
  Boxes: FaBoxes,
  Box: FaBox,

  // outline component icons
  UserOutlined,
  KeyOutlined,
  NumberOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ColorOutlined: MdOutlineColorLens,
};

// color editable icons
export const ColorIcons = {
  UserOutlined: (props) => <UserOutlined style={colorIconStyle}/>,
  KeyOutlined: (props) => <KeyOutlined style={colorIconStyle}/>,
  NumberOutlined: (props) => <NumberOutlined style={colorIconStyle}/>,
  GlobalOutlined: (props) => <GlobalOutlined style={colorIconStyle}/>
};

// assets icons
export const icons = {
  favicon,
  ic_app_logo,
  ic_app_loading
};