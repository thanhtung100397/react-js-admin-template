import React from 'react';
import AppContainer from '../../containers/container/AppContainer';
import AppHeader from '../../containers/header/AppHeader';
import AppSlider from '../../containers/slider/AppSlider';
import AppFooter from '../../containers/footer/AppFooter';
import './Dashboard.scss';

const Dashboard = (props) => {
  return (
    <AppContainer className="dashboard-page wh-full">
      <AppSlider>
      </AppSlider>
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