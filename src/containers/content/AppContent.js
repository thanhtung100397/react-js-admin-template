import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppContent.scss';

const propTypes = {
  ...baseProps,
};

const defaultProps = {
};

const AppContent = (props) => {
  return (
    <Layout.Content {...fromBaseProps({ className: 'app-content' }, props)}>
      {props.children}
    </Layout.Content>
  );
};

AppContent.propTypes = propTypes;

AppContent.defaultProps = defaultProps;

export default AppContent;