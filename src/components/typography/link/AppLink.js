import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { Typography } from 'antd';
import { TypeChecker } from '../../../utils/helpers';
import '../AppTypography.scss';
import './AppLink.scss';

const { Link } = Typography;

const propTypes = {
  ...baseProps,
  href: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top', 'framename']),
  type: PropTypes.oneOf(['secondary', 'success', 'warning', 'danger']),
  bold: PropTypes.bool, // bold style
  italic: PropTypes.bool, // italic style
  underline: PropTypes.bool, // content underline style
  ellipsis: PropTypes.bool, // display ellipsis when text overflows
  copyable: PropTypes.bool, // whether content can be copyable
  strikethrough: PropTypes.bool, // strike through line style
  highlight: PropTypes.bool, // highlight style
  disabled: PropTypes.bool, // disabled content
  onClick: PropTypes.func,
};

const defaultProps = {
};

const italicValue = (italic) => { // ant design has bug about Typography italic prop
  if (TypeChecker.isBoolean(italic)) {
    return italic.toString();
  }
};

const AppLink = (props) => {
  return (
    <Link {...fromBaseProps({className: classNames('app-typography', 'app-link')}, props)}
          href={props.href} target={props.target}
          type={props.type} strong={props.bold} italic={italicValue(props.italic)} underline={props.underline}
          ellipsis={props.ellipsis} copyable={props.copyable} delete={props.strikethrough} mark={props.highlight}
          disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </Link>
  );
};

AppLink.propTypes = propTypes;

AppLink.default = defaultProps;

export default AppLink;