import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
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
    <meta name="description" content="React JS Admin Template Description"/>
    <title>React JS Admin Template</title>
    <link rel="icon" href={icons.favicon} />
    <link rel="apple-touch-icon" href={icons.ic_app_logo} />

    <meta property="og:url" content="https://www.react-js-admin-template.com" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="React JS Admin Template OG Title" />
    <meta property="og:description" content="React JS Admin Template OG Description" />
    <meta property="og:image" content={images.img_og_image} />

  </Helmet>
)

const App = (props) => {
  return (
    <Provider store={store}>
      <TranslationProvider>
        <HelmetProvider>
          {appMeta}
          <div className="app">
            <BrowserRouter>
              <React.Suspense fallback={<AppLoading/>}>
                <AppRoutes/>
              </React.Suspense>
            </BrowserRouter>
          </div>
        </HelmetProvider>
      </TranslationProvider>
    </Provider>
  );
}

export default App;
