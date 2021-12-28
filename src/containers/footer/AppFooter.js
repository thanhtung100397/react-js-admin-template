import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppFooter.scss';

export const FooterTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

const propTypes = {
  ...baseProps,
  theme: PropTypes.oneOf(Object.keys(FooterTheme).map((key) => FooterTheme[key]))
};

const defaultProps = {
  theme: FooterTheme.DARK
};

const AppFooter = (props) => {

  return (
    <Layout.Header {...fromBaseProps({ className: 'app-footer' }, props)}
                   theme={theme}>
      {props.children}
    </Layout.Header>
  )
};

AppFooter.propTypes = propTypes;

AppFooter.defaultProps = defaultProps;

export default AppFooter;