const { merge } = require('webpack-merge');
const common = require('./webpack.common-server.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/app/server/firebase.js',
  plugins: [
    new webpack.DefinePlugin({
      IS_FIREBASE: 'true',
    }),
  ],
});
