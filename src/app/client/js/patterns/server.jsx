import React from 'react';

export let server = {
  slug: 'server',

  name: `Server`,

  fullName: `Server integration`,

  intro: (
    <p>
      Create <b>Smart Payment Buttons which call your server</b>
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
            <script src="https://bankio.ro/sdk.js?client-id=${ctx.clientID}"></script>

            <script>
                // Render the BankIO button into #bankio-button-container
                bankio.Buttons({

                    // Call your server to set up the transaction
                    createOrder: function(data, actions) {
                        return fetch('/api/openbanking/order/create/', {
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
                        return fetch('/api/openbanking/order/' + data.paymentId + '/authorised/', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ code: data.code })
                        }).then(function(res) {
                            return res.json();
                        }).then(function(orderData) {
                            // Show a success message to the buyer
                            alert('Transaction completed with ' + JSON.stringify(orderData));
                            console.log('orderData', orderData);
                        });
                    }


                }).render('#bankio-button-container');
            </script>
        </body>

        </html>
    `,
};
