const baseConfig = require('./webpack.config.base.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: paths.appHtmlFile,
  filename: 'index.html',
  inject: 'body'
});

const config = env => merge(baseConfig(env), {
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
    port: 4000,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
});

module.exports = config;
