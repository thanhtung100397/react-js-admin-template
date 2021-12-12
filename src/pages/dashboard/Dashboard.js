import React from 'react';
import AppContainer from '../../containers/container/AppContainer';
import AppSider from '../../containers/sider/AppSider';
import AppHeader from '../../containers/header/AppHeader';
import AppContent from '../../containers/content/AppContent';
import AppFooter from '../../containers/footer/AppFooter';
import AppMenu from '../../components/menu/AppMenu';
import AppImage from '../../components/image/AppImage';
import { dashboardMenu } from './dashboardMenu';
import { images } from '../../assets/images'
import './Dashboard.scss';

const Dashboard = (props) => {
  return (
    <AppContainer className="dashboard-page wh-full">
      <AppSider>
        <div className="app-logo-container">
          <AppImage src={images.img_app_logo}/>
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