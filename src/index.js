import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import {currentEnv} from "./utils/envHelpers";


Sentry.init({
  dsn: "https://fecb1486362f49d38b6fb0081fdbc252@o927233.ingest.sentry.io/5876584",
  integrations: [new Integrations.BrowserTracing()],
  environment: currentEnv(),

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const app = (
  <App/>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
