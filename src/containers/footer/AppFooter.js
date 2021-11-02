import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppFooter.scss';

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppFooter = (props) => {
  return (
    <Layout.Header {...fromBaseProps({ className: 'app-footer' }, props)}>
      {props.children}
    </Layout.Header>
  )
};

AppFooter.propTypes = propTypes;

AppFooter.defaultProps = defaultProps;

export default AppFooter;