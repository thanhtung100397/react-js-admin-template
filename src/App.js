import React from "react";
import { Icons } from './assets/icons'
import './App.scss';

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
