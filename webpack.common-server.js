'use strict';

var nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: { index: './index.js' },
  output: {
    // path: __dirname,
    filename: './index.js', // <-- Important
    libraryTarget: 'this', // <-- Important
  },
  target: 'node', // <-- Important,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: [nodeExternals()], // <-- Important
};
