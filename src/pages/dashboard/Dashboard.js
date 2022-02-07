import React, { useState } from 'react';
import AppContainer from '../../containers/container/AppContainer';
import AppMenuSider from '../../components/menu-sider/AppMenuSider';
import AppMenu from '../../components/menu/AppMenu';
import AppHeader from '../../containers/header/AppHeader';
import AppContent from '../../containers/content/AppContent';
import AppFooter from '../../containers/footer/AppFooter';
import AppButton from '../../components/button/AppButton';
import { dashboardMenu } from './dashboardMenu';
import { images } from '../../assets/images';
import { Icons } from '../../assets/icons';
import './Dashboard.scss';

const Dashboard = (props) => {
  const [siderCollapsed, setSiderCollapsed] = useState();

  return (
    <AppContainer className="dashboard-page wh-full">
      <AppMenuSider logoSrc={images.img_app_logo} title={process.env.REACT_APP_APP_NAME}
                    collapsed={siderCollapsed} onCollapse={setSiderCollapsed}>
        <AppMenu themeMode="dark" items={dashboardMenu} expandCurrentOnly={true}/>
      </AppMenuSider>
      <AppContainer>
        <AppHeader>
          <AppButton type="text" icon={siderCollapsed? <Icons.MenuUnfoldOutlined/> : <Icons.MenuFoldOutlined/>}
                     onClick={() => setSiderCollapsed(!siderCollapsed)}/>
        </AppHeader>
        <AppContent>
        </AppContent>
        <AppFooter/>
      </AppContainer>
    </AppContainer>
  )
};

export default Dashboard;