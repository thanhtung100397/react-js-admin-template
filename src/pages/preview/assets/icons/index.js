import React from 'react';
import colors from '../../../../colors.module.scss';

// assets icons import
import { ReactComponent as ReactLogo } from "./ic_react_logo.svg";

// ant icons import
import {
  UserOutlined,
  KeyOutlined,
  NumberOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  Loading3QuartersOutlined,
} from '@ant-design/icons';

// material design icons import
import {
  MdOutlineTextFields,
  MdOutlineTitle,
  MdOutlineTextFormat,
  MdOutlineLink,
  MdOutlineInput,
  MdOutlineFontDownload,
  MdOutlinePassword,
  MdOutlineCrop75,
  MdOutlinePin,
  MdOutlineArrowDropDownCircle,
  MdOutlineEditNote,
  MdOutlineCrop54,
  MdOutlineImage,
  MdOutlineErrorOutline,
  MdOutlineColorLens,
  MdOutlineMenu,
  MdOutlineHourglassEmpty
} from 'react-icons/md';

// font awesome icons import
// import {
// } from 'react-icons/fa'

const colorIconStyle = {
  color: colors.appSecondaryColor
};

export const Icons = {
  // assets component icons
  ReactLogo,

  // solid component icons


  // outline component icons
  UserOutlined,
  KeyOutlined,
  NumberOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  Loading3QuartersOutlined,

  TypographyOutlined: MdOutlineTextFields,
  TitleOutlined: MdOutlineTitle,
  TextOutlined: MdOutlineTextFormat,
  LinkOutlined: MdOutlineLink,
  InputOutlined: MdOutlineInput,
  TextInputOutlined: MdOutlineFontDownload,
  PasswordInputOutlined: MdOutlinePassword,
  TextAreaInputOutlined: MdOutlineCrop75,
  NumberInputOutlined: MdOutlinePin,
  SelectOutlined: MdOutlineArrowDropDownCircle,
  FormOutlined: MdOutlineEditNote,
  ButtonOutlined: MdOutlineCrop54,
  ImageOutlined: MdOutlineImage,
  AlertOutlined: MdOutlineErrorOutline,
  ColorOutlined: MdOutlineColorLens,
  MenuOutlined: MdOutlineMenu,
  HourglassEmptyOutlined: MdOutlineHourglassEmpty,
};

// color editable icons
export const ColorIcons = {
  UserOutlined: (props) => <UserOutlined {...props} style={colorIconStyle}/>,
  KeyOutlined: (props) => <KeyOutlined {...props} style={colorIconStyle}/>,
  NumberOutlined: (props) => <NumberOutlined {...props} style={colorIconStyle}/>,
  GlobalOutlined: (props) => <GlobalOutlined {...props} style={colorIconStyle}/>
};

// assets icons
export const icons = {

};