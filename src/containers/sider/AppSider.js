import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import styled from 'styled-components';
import { Layout } from 'antd';
import { TypeChecker } from '../../utils/helpers';
import { getThemeStylesFromProps } from '../../utils/themeHelpers';
import './AppSider.scss';

export const propTypes = {
  ...baseProps,
  width: PropTypes.number,
  collapsedWidth: PropTypes.number,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func, // (collapsed: boolean) => {}
  hideCollapseButton: PropTypes.bool
};

const defaultProps = {
};

const AppSider = (props) => {
  const [collapsed, setCollapsed] = useState(props.collapsed);

  const isCollapsed = TypeChecker.isUnset(props.collapsed)? collapsed : props.collapsed;

  const onCollapse = (collapsed) => {
    if (TypeChecker.isUnset(props.collapsed)) {
      setCollapsed(collapsed);
    }
    if (props.onCollapse) {
      props.onCollapse(collapsed);
    }
  };

  return (
    <Root {...fromBaseProps({ className: 'app-sider' }, props)}
                  width={props.width} collapsedWidth={props.collapsedWidth}
                  collapsible={props.collapsible} collapsed={isCollapsed} onCollapse={onCollapse}
                  trigger={props.hideCollapseButton? null : undefined}>
      {props.children}
    </Root>
  )
};

const Root = styled(Layout.Sider)`
  ${props => getThemeStylesFromProps(props, 'components.sider')}
`;

AppSider.propTypes = propTypes;

AppSider.defaultProps = defaultProps;

export default AppSider;