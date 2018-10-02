const baseConfig = require('./webpack.config.base.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 3000,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
  ]
});
