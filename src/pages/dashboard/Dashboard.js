import React from 'react';
import AppContainer from '../../containers/container/AppContainer';
import AppSider from '../../containers/sider/AppSider';
import AppHeader from '../../containers/header/AppHeader';
import AppContent from '../../containers/content/AppContent';
import AppFooter from '../../containers/footer/AppFooter';
import AppMenu from '../../components/menu/AppMenu';
import { dashboardMenu } from './dashboardMenu';
import './Dashboard.scss';

const Dashboard = (props) => {
  return (
    <AppContainer className="dashboard-page wh-full">
      <AppSider>
        <AppMenu items={dashboardMenu} expandCurrentOnly={true}/>
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