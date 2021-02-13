import { Link, Redirect, Router } from '@reach/router';

import { App } from './components/app';
import React from 'react';
import SmartButtonsConfigProvider from './components/SmartButtonsConfigProvider';
import { render } from 'react-dom';

const fetchMonkeyPatch = window.fetch;
function newFetch(url, options, ...args) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers['x-csrf-token'] = document.body.getAttribute('data-csrf');

  return fetchMonkeyPatch(url, options, ...args);
}

window.fetch = newFetch;

let baseURL = document.body.getAttribute('data-base-url');
let clientID = document.body.getAttribute('data-client-id');

render(
  <Router component={({ children }) => <>{children}</>}>
    <Redirect exact from="/" to="/smart-payment-buttons/server" />
    <SmartButtonsConfigProvider smartButtonsConfig={{ baseURL, clientID }}>
      <App path="/smart-payment-buttons/:pattern" />
    </SmartButtonsConfigProvider>
    <Redirect from="*" to="/smart-payment-buttons/server" />
  </Router>,
  document.getElementById('app')
);

const alert = window.alert;
window.alert = (...args) => {
  setTimeout(() => {
    alert.call(window, ...args);
  }, 500);
};
