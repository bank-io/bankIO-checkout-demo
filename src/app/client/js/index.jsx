import { Link, Redirect, Router } from '@reach/router';

import { App } from './components/app';
import React from 'react';
import { render } from 'react-dom';

const fetchMonkeyPatch = window.fetch;
function newFetch(url, options, ...args) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers['x-csrf-token'] = document.body.getAttribute('data-csrf');

  return fetchMonkeyPatch(url, options, ...args);
}

window.fetch = newFetch;

render(
  <Router component={({ children }) => <>{children}</>}>
    <Redirect exact from="/" to="/pattern/server" />
    <App path="/pattern/:pattern" />
    <Redirect from="*" to="/pattern/server" />
  </Router>,
  document.getElementById('app')
);

const alert = window.alert;
window.alert = (...args) => {
  setTimeout(() => {
    alert.call(window, ...args);
  }, 500);
};
