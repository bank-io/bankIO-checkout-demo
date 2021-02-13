const bankio = require('./lib/bankio');

const index = require('./page/index');

module.exports = function (app) {
  app.get(['/', '/smart-payment-buttons/:pattern'], (req, res) => {
    res.header(
      'Content-Security-Policy',
      `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.bankio.ro https://*.bankio.ro:8000 https://bankio.ro https://bankio.co.uk;`
    );

    res.send(
      index({
        baseURL: req.baseUrl,
        csrf: res.locals._csrf,
        clientID: req.sandboxCredentials.clientID,
      })
    );
  });

  app.post('/api/openbanking/order/create/', (req, res) => {
    const { clientID, secret } = req.sandboxCredentials;

    return bankio
      .getAccessToken(clientID, secret)
      .then(bankio.createPayment)
      .then((response) => {
        res.json({ id: response });
      })
      .catch((err) => {
        console.error(err);
        if (typeof err === 'object') {
          res.status(500).json(err);
        } else {
          const error = err || err.message;
          res.status(500).send(`Internal Service Error, ${error}`);
        }
      });
  });

  app.post('/api/openbanking/order/:id/authorised/', (req, res) => {
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

  app.get('*', (req, res) => {
    res.status(404);
    res.send(`${req.originalUrl} not found.`);
  });
};
