import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppSider.scss';
import { TypeChecker } from '../../utils/helpers';

export const SiderTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

const propTypes = {
  ...baseProps,
  theme: PropTypes.oneOf(Object.keys(SiderTheme).map((key) => SiderTheme[key])),
  width: PropTypes.number,
  collapsedWidth: PropTypes.number,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func, // (collapsed: boolean) => {}
  hideCollapseButton: PropTypes.bool
};

const defaultProps = {
  theme: SiderTheme.DARK
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
    <Layout.Sider {...fromBaseProps({ className: 'app-sider' }, props)}
                  theme={props.theme} width={props.width} collapsedWidth={props.collapsedWidth}
                  collapsible={props.collapsible} collapsed={isCollapsed} onCollapse={onCollapse}
                  trigger={props.hideCollapseButton? null : undefined}>
      {props.children}
    </Layout.Sider>
  )
};

AppSider.propTypes = propTypes;

AppSider.defaultProps = defaultProps;

export default AppSider;