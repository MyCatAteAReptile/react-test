import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

/*
React 18 shipped March 29th, 2022. ReactDOM.render has been deprecated in React 18 and currently issues a warning and runs in a compatible mode.

Deprecations

react-dom: ReactDOM.render has been deprecated. Using it will warn and run your app in React 17 mode.
react-dom: ReactDOM.hydrate has been deprecated. Using it will warn and run your app in React 17 mode.
react-dom: ReactDOM.unmountComponentAtNode has been deprecated.
react-dom: ReactDOM.renderSubtreeIntoContainer has been deprecated.
react-dom/server: ReactDOMServer.renderToNodeStream has been deprecated.
*/