const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const getPluginForStylesFileType = require('./getPluginForStylesFileType');

const paths = require('./paths');

// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: paths.appHtmlFile,
//   filename: 'index.html',
//   inject: 'body'
// });

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: paths.appSrc,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'happypack/loader?id=styles-less',
        }),
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: paths.appSrc,
        loader: require.resolve('happypack/loader'),
        options: {
          id: 'styles-scss',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/uui.css'),

    getPluginForStylesFileType('less'),
    getPluginForStylesFileType('scss'),
  ],
});
