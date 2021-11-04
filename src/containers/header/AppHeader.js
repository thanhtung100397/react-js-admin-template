import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppHeader.scss'

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppHeader = (props) => {
  return (
    <Layout.Header {...fromBaseProps({ className: 'app-heaer' }, props)}>
      {props.children}
    </Layout.Header>
  )
};

AppHeader.propTypes = propTypes;

AppHeader.defaultProps = defaultProps;

export default AppHeader;