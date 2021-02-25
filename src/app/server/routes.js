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

  app.get('*', (req, res) => {
    res.status(404);
    res.send(`${req.originalUrl} not found.`);
  });
};
