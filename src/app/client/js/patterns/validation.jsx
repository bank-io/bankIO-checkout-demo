import React from 'react';

export let validation = {
  slug: 'validation',

  name: `Validation`,

  fullName: `Validation integration`,

  intro: (
    <p>
      Create <b>Smart Payment Buttons</b>
    </p>
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
            <p id="error" class="hidden">Please check the checkbox</p>
            <p>
              <label><input id="check" type="checkbox"> Check here to continue</label>    
            </p>

            <div id="bankio-button-container"></div>

            <!-- Include the BankIO JavaScript SDK -->
            <script src="https://bankio.ro/sdk.js?client-id=${ctx.clientID}&currency=USD"></script>

            <script>
                // Render the BankIO button into #bankio-button-container
                  bankio.Buttons({

                // onInit is called when the button first renders
                onInit: function(data, actions) {
                    console.log('onInit', data, actions);

                // Disable the buttons
                actions.disable();

                // Listen for changes to the checkbox
                document.querySelector('#check')
                    .addEventListener('change', function(event) {
                        console.log(event.target.checked, actions);

                    // Enable or disable the button when it is checked or unchecked
                    if (event.target.checked) {
                        actions.enable();
                    } else {
                        actions.disable();
                    }
                    });
                },

                // onClick is called when the button is clicked
                onClick: function() {

                // Show a validation error if the checkbox is not checked
                if (!document.querySelector('#check').checked) {
                    document.querySelector('#error').classList.remove('hidden');
                }
                }


                }).render('#bankio-button-container');
            </script>
        </body>
    `,
};
