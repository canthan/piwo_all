const baseConfig = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: '[hash].index.html',
  inject: 'body'
});

const BUILD_DIR = path.resolve(__dirname, '../dist');

const config = env => merge(baseConfig(env), {
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.[chunkhash].js',
  },
  plugins: [
    HtmlWebpackPluginConfig,
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

module.exports = config;
