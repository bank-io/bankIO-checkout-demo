const bankio = require('./lib/bankio');

const index = require('./page/index');

module.exports = function (app) {
    app.get('/', (req, res) => {
    res.header(
      'Content-Security-Policy',
      `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.bankio.com https://*.bankioobjects.com https://*.braintreegateway.com;`
    );

    res.send(
      index({
            baseURL: req.baseUrl,
        csrf: res.locals._csrf,
      })
    );
    });

    app.post('/api/bankio/order/create/', (req, res) => {
        const { clientID, secret } = req.sandboxCredentials;

    return bankio
      .getAccessToken(clientID, secret)
      .then(bankio.createOrder)
      .then((response) => {
                res.json({ id: response });
            })
      .catch((err) => {
                if (typeof err === 'object') {
                    res.status(500).json(err);
                } else {
                    const error = err || err.message;
                    res.status(500).send(`Internal Service Error, ${error}`);
                }
            });
    });

    app.post('/api/bankio/order/:id/authorised/', (req, res) => {
        const paymentId = req.params.id;
        const { clientID, secret } = req.sandboxCredentials;
        console.log('test');

        return bankio.authorisePaymentAccessToken(clientID, secret, paymentId, req.body.code)
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                if (typeof err === 'object') {
                    res.status(500).json(err);
                } else {
                    const error = err || err.message;
                    res.status(500).send(`Could not complete payment, ${error}`);
                }
            });
    });

    app.post('/api/bankio/order/:id/capture/', (req, res) => {
        const orderID = req.params.id;
        const { clientID, secret } = req.sandboxCredentials;
        console.log('test');

    return bankio
      .getAccessToken(clientID, secret)
      .then((accessToken) => {
                return bankio.captureOrder(accessToken, orderID);
            })
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
