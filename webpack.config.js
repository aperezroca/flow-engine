/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8000',
    'webpack/hot/only-dev-server',
    './src/scripts/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [ 'node_modules', 'components', 'styles', 'scripts' ]
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /(node_modules|vendor)/,
      loader: 'eslint-loader'
    }],
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsx-loader!react-hot!babel?optional[]=runtime&nonStandard'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&' +
        'includePaths[]=' +
          'bower_components/bourbon/app/assets/stylesheets' + '&' +
        'includePaths[]=' +
          'src/styles'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  postcss: [ autoprefixer({ browsers: ['last 2 version'] }) ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]

};
