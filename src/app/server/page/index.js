module.exports = function (ctx) {
  return `
        <!DOCTYPE html>

        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">

            <title>Smart Payment Buttons Integration</title>

            <link rel="stylesheet" href="${ctx.baseURL}/static/css/style.css">

            <script src="https://bankio.ro/sdk.js?client-id=${
              ctx.clientID
            }"></script>

            <script src="${
              ctx.baseURL
            }/static/js/fetch.min.js" type="text/javascript" charset="utf-8"></script>
        </head>

        <body data-csrf="${ctx.csrf || ''}" data-base-url="${
    ctx.baseURL
  }" data-client-id="${ctx.clientID}">
            <div id="app" class="app"></div>
            <script src="${ctx.baseURL}/static/js/demo.js"></script>
        </body>
    `;
};
