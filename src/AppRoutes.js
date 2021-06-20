import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/login/Login'));

const AppRoutes = (props) => {
  return (
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Login}/>
    </Switch>
  );
};

export default AppRoutes;