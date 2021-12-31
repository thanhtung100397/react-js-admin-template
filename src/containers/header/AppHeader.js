import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import styled from 'styled-components';
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
    <ThemedHeader {...fromBaseProps({ className: 'app-header' }, props)}>
      {props.children}
    </ThemedHeader>
  )
};

const ThemedHeader = styled(Layout.Header)`
  ${props => props.theme.header}
`;

AppHeader.propTypes = propTypes;

AppHeader.defaultProps = defaultProps;

export default AppHeader;