import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppSider.scss';

export const SiderTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

const propTypes = {
  ...baseProps,
  theme: PropTypes.oneOf(Object.keys(SiderTheme).map((key) => SiderTheme[key])),
  width: PropTypes.number,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
};

const defaultProps = {
  theme: SiderTheme.DARK
};

const AppSider = (props) => {
  const [collapsed, setCollapsed] = useState();

  return (
    <Layout.Sider {...fromBaseProps({ className: 'app-sider' }, props)}
                  theme={props.theme} width={props.width}
                  collapsible={props.collapsible} collapsed={collapsed}
                  onCollapse={props.onCollapse}>
      {props.children}
    </Layout.Sider>
  )
};

AppSider.propTypes = propTypes;

AppSider.defaultProps = defaultProps;

export default AppSider;