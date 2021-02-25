const functions = require('firebase-functions');

const express = require('express');
var cors = require('cors');

const apiRoutes = require('./apiRoutes');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();
app.use(cors());

app.use(
  function setup(req, res, next) {
    const config = functions.config();

    const sandboxCredentials = {
      clientID: config.env['bankio_checkout_demo_client_id'],
      secret: config.env['bankio_checkout_demo_client_secret'],
      organisation: config.env['bankio_checkout_demo_organisation'],
    };

    req.v4app = this;
    req.sandboxCredentials = sandboxCredentials;
    next();
  }.bind(this)
);

apiRoutes(app);

const baseUrl = '/api';

export const api = functions
  .region('europe-west3')
  .https.onRequest((req, res, next) => {
    req.baseUrl = baseUrl + req.baseUrl;
    req.originalUrl = baseUrl + req.originalUrl;

    return app(req, res, next);
  });
