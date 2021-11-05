import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppSider.scss';

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppSider = (props) => {
  return (
    <Layout.Sider {...fromBaseProps({ className: 'app-sider' }, props)}>
    </Layout.Sider>
  )
};

AppSider.propTypes = propTypes;

AppSider.defaultProps = defaultProps;

export default AppSider;