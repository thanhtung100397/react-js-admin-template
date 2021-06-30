import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { Typography } from 'antd';
import './AppTitle.scss';

const { Title } = Typography;

const propTypes = {
  ...baseProps,
  level: PropTypes.number, // title level, match with h1, h2, h3, h4, h5
  bold: PropTypes.bool, // bold style
  italic: PropTypes.bool, // italic style
  underline: PropTypes.bool, // content underline style
  ellipsis: PropTypes.bool, // display ellipsis when text overflows
  copyable: PropTypes.bool, // whether content can be copyable
  disabled: PropTypes.bool, // disabled content
  onClick: PropTypes.func,
};

const defaultProps = {
  level: 1
};

const AppTitle = (props) => {
  return (
    <Title {...fromBaseProps({className: 'app-title'}, props)}
           level={props.level} bold={props.bold} italic={props.italic} underline={props.underline}
           ellipsis={props.ellipsis} copyable={props.copyable} disabled={props.disabled}
           onClick={props.onClick}>
      {props.children}
    </Title>
  );
};

AppTitle.propTypes = propTypes;

AppTitle.default = defaultProps;

export default AppTitle;