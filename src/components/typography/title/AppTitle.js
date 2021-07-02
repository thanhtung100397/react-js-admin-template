import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { typographyPropTypes } from '../AppTypography';
import { Typography } from 'antd';
import { TypeChecker } from '../../../utils/helpers';
import '../AppTypography.scss';
import './AppTitle.scss';

const { Title } = Typography;

const propTypes = {
  ...baseProps,
  ...typographyPropTypes,
  level: PropTypes.number, // title level, match with h1, h2, h3, h4, h5
};

const defaultProps = {
  level: 1
};

const italicValue = (italic) => { // ant design has bug about Typography italic prop
  if (TypeChecker.isBoolean(italic)) {
    return italic.toString();
  }
};

const AppTitle = (props) => {
  return (
    <Title {...fromBaseProps({className: classNames('app-typography', 'app-title')}, props)}
           level={props.level} strong={props.bold} italic={italicValue(props.italic)} underline={props.underline}
           ellipsis={props.ellipsis} copyable={props.copyable} delete={props.strikethrough} mark={props.highlight}
           disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </Title>
  );
};

AppTitle.propTypes = propTypes;

AppTitle.default = defaultProps;

export default AppTitle;