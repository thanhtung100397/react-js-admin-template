import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import AppThemeProvider from "./themes/provider/AppThemeProvider";
import AppRoutes from './AppRoutes';
import TranslationProvider from './translations/provider/TranslationsProvider';
import { Provider } from 'react-redux';
import store from './state/store';
import AppLoading from './components/loading/AppLoading';
import { icons } from './assets/icons';
import { images } from './assets/images';
import './App.scss';

const appMeta = (
  <Helmet>
    <meta name="description" content={process.env.REACT_APP_APP_DESCRIPTION || 'ReactJS Admin Dashboard'}/>
    <title>{process.env.REACT_APP_APP_NAME || 'ReactJS Admin Dashboard'}</title>
    <link rel="icon" href={icons[process.env.REACT_APP_APP_BROWSER_TAB_ICON] || icons.favicon} />
    <link rel="apple-touch-icon" href={icons[process.env.REACT_APP_APP_LOGO] || icons.ic_app_logo} />

    <meta property="og:url" content={process.env.REACT_APP_APP_OG_URL} />
    <meta property="og:type" content={process.env.REACT_APP_APP_OG_TYPE || 'article'} />
    <meta property="og:title" content={process.env.REACT_APP_APP_OG_TITLE || process.env.REACT_APP_APP_NAME || 'ReactJS Admin Dashboard'} />
    <meta property="og:description" content={process.env.REACT_APP_APP_OG_DESCRIPTION || process.env.REACT_APP_APP_DESCRIPTION || 'ReactJS Admin Dashboard'} />
    <meta property="og:image" content={images[process.env.REACT_APP_APP_OG_IMAGE] || images.img_og_image} />

  </Helmet>
);

const App = (props) => {
  return (
    <AppThemeProvider>
      <div className="app">
        <BrowserRouter>
          <React.Suspense fallback={<AppLoading/>}>
            <AppRoutes/>
          </React.Suspense>
        </BrowserRouter>
      </div>
    </AppThemeProvider>
  )
};

const AppWrapper = (props) => {
  return (
    <Provider store={store}>
      <TranslationProvider>
        <HelmetProvider>
          {appMeta}
          <App/>
        </HelmetProvider>
      </TranslationProvider>
    </Provider>
  );
};

export default AppWrapper;
