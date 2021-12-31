import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import styled from 'styled-components';
import { Layout } from 'antd';
import './AppFooter.scss';

const propTypes = {
  ...baseProps,
  theme: PropTypes.oneOf(Object.keys(FooterTheme).map((key) => FooterTheme[key]))
};

const defaultProps = {
};

const AppFooter = (props) => {

  return (
    <ThemedFooter {...fromBaseProps({ className: 'app-footer' }, props)}>
      {props.children}
    </ThemedFooter>
  )
};

const ThemedFooter = styled(Layout.Header)`
  ${props => props.theme.footer}
`;

AppFooter.propTypes = propTypes;

AppFooter.defaultProps = defaultProps;

export default AppFooter;