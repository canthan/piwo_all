const baseConfig = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, '../dist');

module.exports = merge(baseConfig, {
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.[chunkhash].js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new ExtractTextPlugin('[name].bundle.[chunkhash:8].css'),
    new UglifyJsPlugin({
      sourceMap: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]
});
