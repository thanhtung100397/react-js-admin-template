import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/signIn/SignIn'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const UiPreview = React.lazy(() => import('./pages/preview/UiPreview'));

const AppRoutes = (props) => {
  return (
    <Switch>
      <Route path="/preview/ui" component={UiPreview}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route path="/" component={Login}/>
    </Switch>
  );
};

export default AppRoutes;
