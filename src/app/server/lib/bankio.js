const request = require("request");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const querystring = require("querystring");

module.exports = {
  createOrder: (accessToken) => {
    const ordersEndpoint = config.urls.sandbox + config.apis.orders;

    const amount = 10;

    const formattedAmount = amount.toFixed(2);

        let transactionDate = moment();

        if (transactionDate.isoWeekday() >= 6) {
          transactionDate = transactionDate.add(8 - transactionDate.isoWeekday(), "days");
        }

        const requestedExecutionDate = transactionDate.format("YYYY-MM-DD");

        const instructionIdentification = uuidv4().replace(/-/g, "");

        const endToEndIdentification = uuidv4().replace(/-/g, "");

        const paymentRequest = {
          instructionIdentification,
          endToEndIdentification,
          requestedExecutionDate,
          creditorName: "bankIO store",
          creditorAccount: {
            iban: "RO03RZBR0000069999999999",
          },
          instructedAmount: {
            amount: formattedAmount,
            currency: "RON",
          },
          creditorAddress: {
            street: "Fleet Street",
            buildingNumber: "61A",
            city: "London",
            postalCode: "EC4Y1JU",
            country: "GB",
          },
          remittanceInformationUnstructured: "reference no 1",
          remittanceInformationStructured: {
            reference: `BANKIO-${moment().format("YYYYMMDDHHmm")}`,
          },
        };

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: ordersEndpoint,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "TPP-PSU-ID": "user1",
            'x-request-id': uuidv4()
          },
          json: paymentRequest,
        },
        (error, res, body) => {
          if (error) return reject(error);
          if (res.statusCode >= 400) return reject(body);

          console.log(body)

          return resolve(body && body.paymentId);
        }
      );
    });
  },

  captureOrder: (accessToken, orderID) => {
    const ordersEndpoint = config.urls.sandbox + config.apis.orders;
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: `${ordersEndpoint}/${orderID}/capture/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          json: true,
        },
        (error, res, body) => {
          if (error) return reject(error);
          if (res.statusCode >= 400) return reject(body);

          if (body.status === "COMPLETED") {
            return resolve(body);
          } else {
            return reject(body);
          }
        }
      );
    });
  },

  getAccessToken: (clientID, secret) => {
    const encodedClientCredentials = Buffer.from(`${clientID}:${secret}`).toString("base64");
    const authEndpoint = config.urls.sandbox + config.apis.auth;

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: authEndpoint,
          headers: {
            Authorization: `Basic ${encodedClientCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
          json: true,
        },
        (error, res, body) => {
          if (error) return reject(error);
          if (res.statusCode >= 400) return reject(body);

          resolve(body && body.access_token);
        }
      );
    });
  },

  authorisePaymentAccessToken: (clientID, secret, paymentId, code) => {
    const encodedClientCredentials = Buffer.from(`${clientID}:${secret}`).toString("base64");
    const authEndpoint = config.urls.sandbox + config.apis.auth;

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: authEndpoint,
          headers: {
            Authorization: `Basic ${encodedClientCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({ grant_type: "authorization_code", code, redirect_uri: "https://dev.bankio.ro:8000/checkout/callback" }),
          json: true,
        },
        (error, res, body) => {
          if (error) return reject(error);
          if (res.statusCode >= 400) return reject(body);

          resolve(body && body.access_token);
        }
      );
    });
  },

  
};
