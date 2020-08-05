import React from 'react';

export let server = {
  slug: 'server',

  name: `Server`,

  fullName: `Server integration`,

  intro: (
    <p>
      Create horizontal <b>Smart Payment Buttons which call your server</b>
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> BankIO Smart Payment Buttons Integration | Server Demo </title>
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="bankio-button-container"></div>

            <!-- Include the BankIO JavaScript SDK -->
            <!-- <script src="https://dev.bankio.ro:8000/sdk.js?client-id=1xaMtthbOtnfuXXSg3T9j&currency=USD"></script> -->
            <script src="https://bankio.ro/sdk.js?client-id=sb4&currency=USD"></script>

            <script>
                // Render the BankIO button into #bankio-button-container
                bankio.Buttons({

                    // Call your server to set up the transaction
                    createOrder: function(data, actions) {
                        return fetch('/demo/checkout/api/bankio/order/create/', {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(orderData) {
                            return orderData.id;
                        });
                    },

                    // Call your server to finalize the transaction
                    onApprove: function(data, actions) {
                        console.log('data', data)
                        return fetch('/demo/checkout/api/bankio/order/' + data.paymentId + '/authorised/', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ code: data.code })
                        }).then(function(res) {
                            return res.json();
                        }).then(function(orderData) {
                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show a success / thank you message

                            // Your server defines the structure of 'orderData', which may differ
                            var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

                            if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                                // Recoverable state, see: "Handle Funding Failures"
                                // https://developer.bankio.com/docs/checkout/integration-features/funding-failure/
                                return actions.restart();
                            }

                            if (errorDetail) {
                                var msg = 'Sorry, your transaction could not be processed.';
                                if (errorDetail.description) msg += '\\n\\n' + errorDetail.description;
                                if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                                // Show a failure message
                                return alert(msg);
                            }

                            // Show a success message to the buyer
                            alert('Transaction completed by ' + orderData);
                        });
                    }


                }).render('#bankio-button-container');
            </script>
        </body>

        </html>
    `
};
