import React, { useEffect, useState, useCallback } from 'react';
import { baseProps, fromBaseProps } from '../base';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppSider, { propTypes as appSiderPropTypes } from '../../containers/sider/AppSider';
import AppImage from '../image/AppImage';
import AppTypography from '../typography/AppTypography';
import { getThemeStylesFromProps } from '../../utils/themeHelpers';
import { delay } from '../../utils/helpers';
import { isEmpty } from '../../utils/stringHelpers';
import './AppMenuSider.scss';

const { Title } = AppTypography;

const SIDER_COLLAPSED_ANIMATION_DELAY_MILLIS = 100;

const propTypes = {
  ...baseProps,
  ...appSiderPropTypes,
  logoSrc: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.number]),
  collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.number]),
  children: PropTypes.node
};

const defaultProps = {
  width: 256,
  collapsedWidth: 64,
};

const AppMenuSider = (props) => {
  const { logoSrc, title, width, collapsedWidth, onCollapse, children, ...siderProps } = props;

  const [siderCollapsed, setSiderCollapsed] = useState();
  const [hideTitle, setHideTitle] = useState();

  useEffect(() => {
    setSiderCollapsed(props.collapsed)
  }, [props.collapsed])

  useEffect(() => {
    if (siderCollapsed) {
      setHideTitle(true);
    } else {
      delay(SIDER_COLLAPSED_ANIMATION_DELAY_MILLIS)
        .then(() => setHideTitle(false))
    }
  }, [siderCollapsed]);

  const handleSiderCollapse = useCallback((collapsed) => {
    setSiderCollapsed(collapsed);
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }, [onCollapse]);

  return (
    <Root {...fromBaseProps({ className: 'app-menu-sider' }, siderProps)}
          width={width} collapsible={true} collapsedWidth={collapsedWidth}
          collapsed={siderCollapsed} onCollapse={handleSiderCollapse}>
      <HeadContainer className="head-container">
        <AppImage src={logoSrc} square={true} height="100%"/>
        {
          (!hideTitle && !isEmpty(title)) && <Title level={4}>{title}</Title>
        }
      </HeadContainer>
      <div className="body-container">
        {children}
      </div>
    </Root>
  );
};

const Root = styled(AppSider)`
  .app-menu {
    .ant-layout-sider-trigger {
      background: ${props => getThemeStylesFromProps(props, 'components.menu_sider.head_container')?.background};
    }
  }
`;

const HeadContainer = styled.div`
  ${props => getThemeStylesFromProps(props, 'components.menu_sider.head_container')}
  
  .app-title {
    ${props => getThemeStylesFromProps(props, 'components.menu_sider.head_container.text')}
  }
`;

AppMenuSider.propTypes = propTypes;

AppMenuSider.defaultProps = defaultProps;

export default AppMenuSider;