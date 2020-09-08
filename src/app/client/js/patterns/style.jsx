import React from 'react';

export let style = {
  slug: 'style',

  name: `Style`,

  fullName: `Button Styles`,

  intro: (
    <p>
      Create <b>Smart Payment Buttons</b> with different styles.
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
            <title> BankIO Smart Payment Buttons Integration | Button Styles </title> 
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="bankio-button-container"></div>

            <!-- Include the BankIO JavaScript SDK -->
            <script src="https://bankio.ro/sdk.js?client-id=${ctx.clientID}"></script>

            <script>
                // Render the BankIO button into #bankio-button-container
                bankio.Buttons({

                    style: {
                        color:  'gold', // gold, blue, silver, white, black
                        shape:  'pill', // pill, rect
                        label:  'checkout', // checkout, pay, buynow, bankio
                        height: 40
                    }
                    
                }).render('#bankio-button-container');
            </script>
        </body>

        </html>
    `,
};
