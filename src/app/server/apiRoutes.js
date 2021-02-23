const express = require('express');

const bankio = require('./lib/bankio');

module.exports = function (app, urlPath) {
  let router = app;

  if (urlPath) {
    router = express.Router();

    app.use(urlPath, router);
  }

  router.post('/openbanking/order/create/', async (req, res) => {
    const { clientID, secret, organisation } = req.sandboxCredentials;

    try {
      const accessToken = await bankio.getAccessToken(clientID, secret);

      const paymentResponse = await bankio.createPayment(
        organisation,
        accessToken
      );

      res.json({ id: paymentResponse });
    } catch (err) {
      console.error(err);

      if (typeof err === 'object') {
        res.status(500).json(err);
      } else {
        const error = err || err.message;
        res.status(500).send(`Internal Service Error, ${error}`);
      }
    }
  });

  router.post('/openbanking/order/:id/authorised/', (req, res) => {
    const paymentId = req.params.id;
    const { clientID, secret } = req.sandboxCredentials;

    return bankio
      .authorisePaymentAccessToken(clientID, secret, paymentId, req.body.code)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        if (typeof err === 'object') {
          res.status(500).json(err);
        } else {
          const error = err || err.message;
          res.status(500).send(`Could not complete payment, ${error}`);
        }
      });
  });
};
