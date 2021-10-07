import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/login/Login'));
const UiPreview = React.lazy(() => import('./pages/preview/UiPreview'));

const AppRoutes = (props) => {
  return (
    <Switch>
      <Route path="/preview/ui" component={UiPreview}/>
      <Route exact path="/login" component={Login}/>
      <Route path="/" component={Login}/>
    </Switch>
  );
};

export default AppRoutes;
