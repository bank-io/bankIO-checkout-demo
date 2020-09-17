import React from 'react';

export let radio = {
  slug: 'radio',

  name: `Radio Fields`,

  fullName: `Radio Fields`,

  intro: (
    <p>
      Create <b>Smart Payment Buttons</b> with radio fields
      <br />
      <br />
      This is a feature example, check{' '}
      <a href="/#/pattern/server">the server page</a> for the server-side order
      integration.
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> BankIO Smart Payment Buttons Integration | Radio Fields </title>
        </head>

        <body>
            <!-- Render the radio fields and button containers -->

            <label>
                <input type="radio" name="payment-option" value="bankio" checked>
                <img src="/static/img/bankio-mark.jpg" alt="Pay with BankIO">
            </label>

            <label>
                <input type="radio" name="payment-option" value="card">
                <img src="/static/img/card-mark.png" alt="Accepting Visa, Mastercard, Discover and American Express">
            </label>

            <div id="bankio-button-container"></div>
            <div id="card-button-container" class="hidden"><button>Continue</button></div>

            <!-- Include the BankIO JavaScript SDK -->
            <script src="https://bankio.ro/sdk.js?client-id=${ctx.clientID}"></script>

            <script>
                // Listen for changes to the radio fields
                document.querySelectorAll('input[name=payment-option]').forEach(function(el) {
                    el.addEventListener('change', function(event) {

                        // If BankIO is selected, show the BankIO button
                        if (event.target.value === 'bankio') {
                            document.querySelector('#card-button-container').style.display = 'none';
                            document.querySelector('#bankio-button-container').style.display = 'inline-block';
                        }

                        // If Card is selected, show the standard continue button
                        if (event.target.value === 'card') {
                            document.querySelector('#card-button-container').style.display = 'inline-block';
                            document.querySelector('#bankio-button-container').style.display = 'none';
                        }
                    });
                });

                // Hide Non-BankIO button by default
                document.querySelector('#card-button-container').style.display = 'none';

                // Render the BankIO button into #bankio-button-container
                bankio.Buttons({
                    style: {
                        layout: 'horizontal'
                    }
                }).render('#bankio-button-container');
            </script>
        </body>

        </html>
    `,
};
