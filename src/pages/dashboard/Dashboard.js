import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppContainer from '../../containers/container/AppContainer';
import AppSider from '../../containers/sider/AppSider';
import AppHeader from '../../containers/header/AppHeader';
import AppContent from '../../containers/content/AppContent';
import AppFooter from '../../containers/footer/AppFooter';
import AppMenu from '../../components/menu/AppMenu';
import AppImage from '../../components/image/AppImage';
import AppTypography from '../../components/typography/AppTypography';
import AppButton from '../../components/button/AppButton';
import { dashboardMenu } from './dashboardMenu';
import { images } from '../../assets/images';
import { Icons } from '../../assets/icons';
import { delay } from '../../utils/helpers';
import { getThemeStylesFromProps } from '../../utils/themeHelpers';
import './Dashboard.scss';

const { Title } = AppTypography;

const SIDER_COLLAPSED_ANIMATION_DELAY_MILLIS = 100;

const Dashboard = (props) => {
  const [siderCollapsed, setSiderCollapsed] = useState();
  const [hideAppName, setHideAppName] = useState();

  useEffect(() => {
    const updateHideAppName = async (collapsed) => {
      if (!collapsed) {
        await delay(SIDER_COLLAPSED_ANIMATION_DELAY_MILLIS);
      }
      setHideAppName(collapsed);
    };
    updateHideAppName(siderCollapsed);
  }, [siderCollapsed]);

  return (
    <AppContainer className="dashboard-page wh-full">
      <AppSider width={256} collapsible={true} collapsedWidth={64}
                collapsed={siderCollapsed} onCollapse={setSiderCollapsed}>
        <AppLogoContainer className="app-logo-container">
          <AppImage src={images.img_app_logo} square={true} height="100%"/>
          {
            !hideAppName && <Title level={4}>{process.env.REACT_APP_APP_NAME}</Title>
          }
        </AppLogoContainer>
        <DashboardMenu themeMode="dark" items={dashboardMenu} expandCurrentOnly={true}/>
      </AppSider>
      <AppContainer>
        <AppHeader>
          <AppButton type="text" icon={siderCollapsed? <Icons.MenuUnfoldOutlined/> : <Icons.MenuFoldOutlined/>}/>
        </AppHeader>
        <AppContent>
        </AppContent>
        <AppFooter/>
      </AppContainer>
    </AppContainer>
  )
};

const AppLogoContainer = styled.div`
  ${props => getThemeStylesFromProps(props, 'pages.dashboard.app_logo_container')}
  
  .app-title {
    ${props => getThemeStylesFromProps(props, 'pages.dashboard.app_logo_container.text')}
  }
`;

const DashboardMenu = styled(AppMenu)`
  
  .ant-layout-sider-trigger {
    background: ${props => getThemeStylesFromProps(props, 'pages.dashboard.app_logo_container')?.background};
  }
`

export default Dashboard;