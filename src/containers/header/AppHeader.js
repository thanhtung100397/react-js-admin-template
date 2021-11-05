import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppHeader.scss'

export const HeaderTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

const propTypes = {
  ...baseProps,
  theme: PropTypes.oneOf(Object.keys(HeaderTheme).map((key) => HeaderTheme[key]))
};

const defaultProps = {
  theme: HeaderTheme.DARK
};

const AppHeader = (props) => {
  return (
    <Layout.Header {...fromBaseProps({ className: 'app-header' }, props)}
                   theme={props.theme}>
      {props.children}
    </Layout.Header>
  )
};

AppHeader.propTypes = propTypes;

AppHeader.defaultProps = defaultProps;

export default AppHeader;