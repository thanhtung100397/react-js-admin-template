import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { icons, Icons } from './assets/icons';
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

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        {appMeta}
        <header className="app-header">
          <Icons.AppLogo className="app-logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="app-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </HelmetProvider>
  );
}

export default App;
