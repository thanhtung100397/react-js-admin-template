import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppContainer.scss';

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppContainer = (props) => {
  return (
    <Layout {...fromBaseProps({ className: 'app-container' }, props)}>
      {props.children}
    </Layout>
  );
};

AppContainer.propTypes = propTypes;

AppContainer.defaultProps = defaultProps;

export default AppContainer;