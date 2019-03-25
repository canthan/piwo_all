const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const APP_DIR = path.resolve(__dirname, '../src');
const paths = require('./paths');

module.exports = {
  entry: {
    bundle: ['react-hot-loader/patch', paths.appIndexFile],
  },
  output: {
    path: path.join(__dirname, '../build'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: '[name].[chunkHash:8].chunk.js',
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'js/[name].[hash].js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, './'),
  },
  resolve: {
    modules: [paths.appNodeModules, paths.appSrc],
    // extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.d.ts', '.scss', '.css', '.less'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('happypack/loader'),
        options: {
          id: 'ts-and-babel',
        },
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: /\.jpg$|\.gif$|\.png$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'assets/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.woff$|\.woff2$|\.eot$|\.ttf$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:8].[ext]',
        },
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx|mjs)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.inline\.svg$/,
        issuer: /\.tsx?$/,
        loaders: [
          {
            loader: require.resolve('babel-loader'),
          },
          {
            loader: require.resolve('svg-react-loader'),
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
      },
    }),

    new webpack.NoEmitOnErrorsPlugin(),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // ForkTsCheckerWebpackPlugin - plugin to run tslint in additional thread
    new ForkTsCheckerWebpackPlugin({
      tslint: paths.appTsLintConfig,
      tsconfig: paths.appTsConfig,
      watch: paths.appSrc,
      workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
      checkSyntacticErrors: true,
      memoryLimit: 2048,
    }),
    // plugin for running loaders in several threads
    new HappyPack({
      id: 'ts-and-babel',
      threadPool: HappyPack.ThreadPool({ size: 5 }),
      loaders: [
        {
          loader: require.resolve('babel-loader'),
          query: {
            cacheDirectory: true,
            plugins: [
              'transform-react-jsx',
              'transform-react-constant-elements',
              'react-hot-loader/babel',
              [
                'react-css-modules',
                {
                  context: path.join(__dirname, '../'),
                  webpackHotModuleReloading: true,
                  filetypes: { '.scss': { syntax: 'postcss-scss' } },
                  generateScopedName: '[name]__[local]___[hash:base64:5]',
                  exclude: paths.appNodeModules,
                },
              ],
            ],
          },
        },
        {
          loader: require.resolve('ts-loader'),
          query: {
            happyPackMode: true,
            transpileOnly: true,
            configFile: paths.appTsConfig,
            colors: true,
          },
        },
      ],
    }),

    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
    }),

    new HtmlWebpackPlugin({
      template: paths.appHtmlFile,
    }),
  ],
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },

  // module: {
  //   strictExportPresence: true,
  //   loaders: [
  //     {
  //       test: /\.(js?|jsx?)/,
  //       include: paths.appSrc,
  //       loader: 'babel-loader',
  //     },
  //     {
  //       test: /\.tsx?$/,
  //       use: 'awesome-typescript-loader',
  //     },
  //     {
  //       test: /\.(css?)/,
  //       use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
  //     },
  //     {
  //       test: /\.(scss?)/,
  //       include: paths.appSrc,
  //       use: [
  //         {
  //           loader: 'style-loader', // creates style nodes from JS strings
  //         },
  //         {
  //           loader: 'css-loader', // translates CSS into CommonJS
  //         },
  //         {
  //           loader: 'sass-loader', // compiles Sass to CSS
  //         },
  //       ],
  //     },
  //     {
  //       test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
  //       loader: 'url-loader',
  //       options: {
  //         limit: 10000,
  //       },
  //     },
  //     {
  //       test: /\.json$/,
  //       loader: 'json-loader',
  //     },
  //   ],
  // },
  // plugins: [
  //   new CopyWebpackPlugin(
  //     [
  //       {
  //         context: 'src',
  //         from: {
  //           glob: 'assets/**/*',
  //           dot: true,
  //         },
  //         to: '',
  //       },
  //     ],
  //     {
  //       ignore: ['.gitkeep'],
  //       debug: 'warning',
  //     }
  //   ),
  // ],
};
