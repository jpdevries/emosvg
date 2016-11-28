var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'emosvg':['./_build/js/emosvg.js']
  },
  output: {
    path: './dist/',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  externals: {},
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};
