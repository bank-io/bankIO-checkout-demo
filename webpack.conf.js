var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/app/client/js/index.jsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /sinon\.js$/,
        use: {
          loader: 'imports',
          options: {
            define: false,
            require: false,
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /(sinon|chai)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(html?|css|json|svg)$/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'src/app/build'),
    filename: 'demo.js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/app/client/js/components'),
    },
    extensions: ['.js', '.jsx'],
  },
};
