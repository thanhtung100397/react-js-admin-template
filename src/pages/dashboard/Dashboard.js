import React from 'react';
import AppContainer from '../../containers/container/AppContainer';
import AppSider from '../../containers/sider/AppSider';
import AppHeader from '../../containers/header/AppHeader';
import AppContent from '../../containers/content/AppContent';
import AppFooter from '../../containers/footer/AppFooter';
import AppMenu from '../../components/menu/AppMenu';
import AppImage from '../../components/image/AppImage';
import AppTypography from '../../components/typography/AppTypography';
import { dashboardMenu } from './dashboardMenu';
import { images } from '../../assets/images';
import './Dashboard.scss';

const { Title } = AppTypography;

const Dashboard = (props) => {
  return (
    <AppContainer className="dashboard-page wh-full">
      <AppSider width={256}>
        <div className="app-logo-container">
          <AppImage src={images.img_app_logo} square={true} height="100%"/>
          <Title level={5}>{process.env.REACT_APP_APP_NAME}</Title>
        </div>
        <AppMenu items={dashboardMenu} expandAll={true} expandAllLevel={1}/>
      </AppSider>
      <AppContainer>
        <AppHeader>
        </AppHeader>
        <AppContent>
        </AppContent>
        <AppFooter>
        </AppFooter>
      </AppContainer>
    </AppContainer>
  )
};

export default Dashboard;