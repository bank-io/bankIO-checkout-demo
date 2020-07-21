import React from 'react';

export let responsive = {
  slug: 'responsive',

  name: `Responsive`,

  fullName: `Responsive Buttons`,

  intro: (
    <p>
      Create responsive <b>Smart Payment Buttons</b>
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> BankIO Smart Payment Buttons Integration | Responsive Buttons </title>

            <style>
                /* Media query for mobile viewport */
                @media screen and (max-width: 400px) {
                    #bankio-button-container {
                        width: 100%;
                    }
                }
                
                /* Media query for desktop viewport */
                @media screen and (min-width: 400px) {
                    #bankio-button-container {
                        width: 250px;
                    }
                }
            </style>
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="bankio-button-container"></div>

            <!-- Include the BankIO JavaScript SDK -->
            <script src="https://dev.bankio.ro:8000/sdk.js?client-id=1xaMtthbOtnfuXXSg3T9j&currency=USD"></script>

            <script>
                // Render the BankIO button into #bankio-button-container
                bankio.Buttons().render('#bankio-button-container');
            </script>
        </body>

        </html>
    `
};
