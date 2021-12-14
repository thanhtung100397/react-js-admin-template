import React, { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAppAuth } from './state/auth/authHook';

const SignIn = React.lazy(() => import('./pages/signIn/SignIn'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const UiPreview = React.lazy(() => import('./pages/preview/UiPreview'));

const ROUTE_PARAMS_REGEX = /(?<=:)\w+/g;

const RouteType = {
  NO_AUTH: 'no_auth',
  AUTH_REQUIRED: 'auth_required',
  NO_AUTH_REQUIRED: 'no_auth_required'
};

const appRoutes = {
  SIGN_IN: {
    path: '/sign-in',
    component: SignIn,
    exact: true,
    type: RouteType.NO_AUTH_REQUIRED
  },
  DASHBOARD: {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
    type: RouteType.AUTH_REQUIRED,
    children: {
      LIST_USERS: {
        path: '/user/list',
        component: Dashboard,
        type: RouteType.AUTH_REQUIRED
      },
      ADD_USER: {
        path: '/user/:userId/add',
        component: Dashboard,
        type: RouteType.AUTH_REQUIRED
      },
      EDIT_USER: {
        path: '/user/:userId/edit',
        component: Dashboard,
        type: RouteType.AUTH_REQUIRED
      },
      LIST_PRODUCTS: {
        path: '/product/list',
        component: Dashboard,
        type: RouteType.AUTH_REQUIRED
      },
      ADD_PRODUCT: {
        path: '/product/:userId/add',
        component: Dashboard,
        type: RouteType.AUTH_REQUIRED
      },
      EDIT_PRODUCT: {
        path: '/product/:userId/edit',
        component: Dashboard,
        type: RouteType.AUTH_REQUIRED
      },
    }
  },
  UI_PREVIEW: {
    path: '/preview/ui',
    component: UiPreview,
    exact: true
  }
};

const appRedirectRoutes = {
  DEFAULT: {
    path: '/',
    exact: true,
    redirectTo: appRoutes.DASHBOARD.path
  }
};

export const routes = {
  ...appRoutes,
  ...appRedirectRoutes
};

const extractParamsFromPath = (path) => {
  return path.match(ROUTE_PARAMS_REGEX) || [];
};

const buildPathWithParams = (path, params) => {

};

// export const routes = objToObj(
//   allRoutes,
//   (routeKey) => routeKey,
//   ({path}) => {
//     const routeParams = extractParamsFromPath(path);
//     return (params) =>
//   }
// );

const NoAuthRoute = (props) => {
  const { component : Component, isAuth, ...otherProps } = props;
  return (
    <Route {...otherProps} render={
      (props) => !isAuth? <Component {...props}/> : <Redirect to={routes.DASHBOARD.path}/>
    }/>
  );
};

const AuthRoute = (props) => {
  const { component : Component, isAuth, ...otherProps } = props;
  return (
    <Route {...otherProps} render={
      (props) => isAuth? <Component {...props}/> : <Redirect to={routes.SIGN_IN.path}/>
    }/>
  );
};

const AppRoutes = (props) => {

  const [isAuth] = useAppAuth();

  const appRoutes = useMemo(() => {
    return Object.keys(routes).map((routeKey, index) => {
      const {path, component, redirectTo, type = RouteType.NO_AUTH, ...otherProps} = routes[routeKey];
      switch (type) {
        case RouteType.AUTH_REQUIRED:
          return (
            <AuthRoute key={index} path={path} component={component} isAuth={isAuth} {...otherProps}>
              {redirectTo && <Redirect to={redirectTo}/>}
            </AuthRoute>
          );

        case RouteType.NO_AUTH_REQUIRED:
          return (
            <NoAuthRoute key={index} path={path} component={component} isAuth={isAuth} {...otherProps}>
              {redirectTo && <Redirect to={redirectTo}/>}
            </NoAuthRoute>
          );

        default:
          return (
            <Route key={index} path={path} component={component} {...otherProps}>
              {redirectTo && <Redirect to={redirectTo}/>}
            </Route>
          );
      }
    })
  }, [isAuth]);

  return (
    <Switch>
      {appRoutes}
    </Switch>
  )
};

export default AppRoutes;
