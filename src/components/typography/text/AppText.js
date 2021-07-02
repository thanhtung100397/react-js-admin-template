import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { typographyPropTypes } from '../AppTypography';
import { Typography } from 'antd';
import { TypeChecker } from '../../../utils/helpers';
import '../AppTypography.scss';
import './AppText.scss';

const { Text } = Typography;

const propTypes = {
  ...baseProps,
  ...typographyPropTypes,
  type: PropTypes.oneOf(['secondary', 'success', 'warning', 'danger']),
};

const defaultProps = {
};

const italicValue = (italic) => { // ant design has bug about Typography italic prop
  if (TypeChecker.isBoolean(italic)) {
    return italic.toString();
  }
};

const AppText = (props) => {
  return (
    <Text {...fromBaseProps({className: classNames('app-typography', 'app-text')}, props)}
          type={props.type} strong={props.bold} italic={italicValue(props.italic)} underline={props.underline}
          ellipsis={props.ellipsis} copyable={props.copyable} delete={props.strikethrough} mark={props.highlight}
          disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </Text>
  );
};

AppText.propTypes = propTypes;

AppText.default = defaultProps;

export default AppText;