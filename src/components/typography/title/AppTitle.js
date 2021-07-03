import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { typographyPropTypes, fromTypographyProps } from '../base';
import { Typography } from 'antd';
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

const AppTitle = (props) => {
  return (
    <Title {...fromBaseProps({className: classNames('app-typography', 'app-title')}, props)}
           {...fromTypographyProps(props)}
           level={props.level}>
      {props.children}
    </Title>
  );
};

AppTitle.propTypes = propTypes;

AppTitle.default = defaultProps;

export default AppTitle;