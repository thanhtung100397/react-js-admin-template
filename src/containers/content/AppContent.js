import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import styled from 'styled-components';
import { Layout } from 'antd';
import { getThemeStylesFromProps } from '../../utils/themeHelpers';
import './AppContent.scss';

const propTypes = {
  ...baseProps,
};

const defaultProps = {
};

const AppContent = (props) => {
  return (
    <Root {...fromBaseProps({ className: 'app-content' }, props)}>
      {props.children}
    </Root>
  );
};

const Root = styled(Layout.Content)`
  ${props => getThemeStylesFromProps(props, 'components.content')}
`;

AppContent.propTypes = propTypes;

AppContent.defaultProps = defaultProps;

export default AppContent;