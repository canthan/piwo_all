const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');

// const APP_DIR = path.resolve(__dirname, '../src');
const paths = require('./paths');

var config = env => {
    return {
        // entry: APP_DIR + '/index.tsx',
        entry: paths.appIndexFile,
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
            publicPath: './',
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, './'),
         },
        resolve: {
            modules: [paths.appNodeModules, paths.appSrc],
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            loaders: [
                {
                    test: /\.(js?|jsx?)/,
                    include: paths.appSrc,
                    loader: 'babel-loader',
                },
                {
                    test: /\.tsx?$/,
                    use: 'awesome-typescript-loader',
                },
                {
                    test: /\.(css?)/,
                    use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
                },
                {
                    test: /\.(scss?)/,
                    include: paths.appSrc,
                    use: [
                        {
                            loader: 'style-loader', // creates style nodes from JS strings
                        },
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                        },
                        {
                            loader: 'sass-loader', // compiles Sass to CSS
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin(
                [
                    {
                        context: 'src',
                        from: {
                            glob: 'assets/**/*',
                            dot: true,
                        },
                        to: '',
                    },
                ],
                {
                    ignore: ['.gitkeep'],
                    debug: 'warning',
                }
            ),
        ],
    };
};

module.exports = config;
