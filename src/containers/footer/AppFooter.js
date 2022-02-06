import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import styled from 'styled-components';
import { Layout } from 'antd';
import { getThemeStylesFromProps } from '../../utils/themeHelpers';
import './AppFooter.scss';

const propTypes = {
  ...baseProps,
};

const defaultProps = {
};

const AppFooter = (props) => {
  return (
    <Root {...fromBaseProps({ className: 'app-footer' }, props)}>
      {props.children}
    </Root>
  )
};

const Root = styled(Layout.Header)`
  ${props => getThemeStylesFromProps(props, 'components.header')}
`;

AppFooter.propTypes = propTypes;

AppFooter.defaultProps = defaultProps;

export default AppFooter;