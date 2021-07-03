import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { typographyPropTypes, fromTypographyProps } from '../base';
import { Typography } from 'antd';
import '../AppTypography.scss';
import './AppLink.scss';

const { Link } = Typography;

const propTypes = {
  ...baseProps,
  ...typographyPropTypes,
  href: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top', 'framename']),
  type: PropTypes.oneOf(['secondary', 'success', 'warning', 'danger'])
};

const defaultProps = {
};

const AppLink = (props) => {
  return (
    <Link {...fromBaseProps({className: classNames('app-typography', 'app-link')}, props)}
          {...fromTypographyProps(props)}
          href={props.href} target={props.target} type={props.type}>
      {props.children}
    </Link>
  );
};

AppLink.propTypes = propTypes;

AppLink.default = defaultProps;

export default AppLink;