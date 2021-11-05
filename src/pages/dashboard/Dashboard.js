import React from 'react';
import AppContainer from '../../containers/container/AppContainer';
import AppHeader from '../../containers/header/AppHeader';
import AppSider from '../../containers/sider/AppSider';
import AppFooter from '../../containers/footer/AppFooter';
import './Dashboard.scss';

const Dashboard = (props) => {
  return (
    <AppContainer className="dashboard-page wh-full">
      <AppSider>
      </AppSider>
      <AppContainer>
        <AppHeader/>
        <AppContainer>
        </AppContainer>
        <AppFooter>
        </AppFooter>
      </AppContainer>
    </AppContainer>
  )
};

export default Dashboard;