import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppSider.scss';

export const SiderTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

const propTypes = {
  ...baseProps,
  theme: PropTypes.oneOf(Object.keys(SiderTheme).map((key) => SiderTheme[key]))
};

const defaultProps = {
  theme: SiderTheme.DARK
};

const AppSider = (props) => {
  return (
    <Layout.Sider {...fromBaseProps({ className: 'app-sider' }, props)}
                  theme={props.theme}>
      {props.children}
    </Layout.Sider>
  )
};

AppSider.propTypes = propTypes;

AppSider.defaultProps = defaultProps;

export default AppSider;