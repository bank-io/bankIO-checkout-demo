'use strict';

const express = require('express');
const server = require('./server');
const config = require('./config');

const organisation = process.env.BANKIO_CHECKOUT_DEMO_ORGANISATION;

if (!organisation) {
  throw Error(
    'BANKIO_CHECKOUT_DEMO_ORGANISATION value missing in environment variables'
  );
}

const PORT = 8002;
const serverConfig = {
  sandboxCredentials: {
    clientID: process.env.BANKIO_CHECKOUT_DEMO_CLIENT_ID || '',
    secret: process.env.BANKIO_CHECKOUT_DEMO_CLIENT_SECRET || '',
    organisation,
  },
};

express()
  .use('/', server(serverConfig))
  .listen(PORT, function () {
    console.log(`Server started at http://localhost:${PORT}/`);
  });
