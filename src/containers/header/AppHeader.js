import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import styled from 'styled-components';
import { Layout } from 'antd';
import { getThemeStylesFromProps } from '../../utils/themeHelpers';
import './AppHeader.scss'

const propTypes = {
  ...baseProps,
};

const defaultProps = {
};

const AppHeader = (props) => {
  return (
    <Root {...fromBaseProps({ className: 'app-header' }, props)}>
      {props.children}
    </Root>
  )
};

const Root = styled(Layout.Header)`
  ${props => getThemeStylesFromProps(props, 'components.header')}
`;

AppHeader.propTypes = propTypes;

AppHeader.defaultProps = defaultProps;

export default AppHeader;