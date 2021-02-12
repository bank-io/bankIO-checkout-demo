module.exports = {
  urls: {
    sandbox: 'https://ob.bankio.ro',
  },

  apis: {
    auth: '/api/auth/token',
    payments: `/api/org/${process.env.BANKIO_CHECKOUT_DEMO_ORGANISATION}/v1/payments/sepa-credit-transfers`,
  },
};
