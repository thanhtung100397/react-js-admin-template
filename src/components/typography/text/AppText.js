import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { typographyPropTypes, fromTypographyProps } from '../base';
import { Typography } from 'antd';
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

const AppText = (props) => {
  return (
    <Text {...fromBaseProps({className: classNames('app-typography', 'app-text')}, props)}
          {...fromTypographyProps(props)}
          type={props.type}>
      {props.children}
    </Text>
  );
};

AppText.propTypes = propTypes;

AppText.default = defaultProps;

export default AppText;