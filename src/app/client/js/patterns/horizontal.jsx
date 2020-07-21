import React from 'react';

export let horizontal = {
  slug: 'horizontal',

  name: `Horizontal`,

  fullName: `Horizontal Button`,

  intro: (
    <p>
      Create horizontal <b>Smart Payment Buttons</b>
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> BankIO Smart Payment Buttons Integration | Horizontal Buttons </title>
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="bankio-button-container"></div>

            <!-- Include the BankIO JavaScript SDK -->
            <script src="https://dev.bankio.ro:8000/sdk.js?client-id=1xaMtthbOtnfuXXSg3T9j&currency=USD"></script>

            <script>
                // Render the BankIO button into #bankio-button-container
                bankio.Buttons({
                    style: {
                        layout: 'horizontal'
                    }
                }).render('#bankio-button-container');
            </script>
        </body>

        </html>
    `
};
