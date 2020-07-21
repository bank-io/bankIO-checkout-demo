
import React from 'react';

export let style = {

    slug: 'style',

    name: `Style`,

    fullName: `Button Styles`,

    intro: (
        <p>Create <b>Smart Payment Buttons</b> with different styles</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
                        color:  'blue',
                        shape:  'pill',
                        label:  'pay',
                        height: 40
                    }

                }).render('#bankio-button-container');
            </script>
        </body>
    `
};
