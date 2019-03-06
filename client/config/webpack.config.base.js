const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');

// const APP_DIR = path.resolve(__dirname, '../src');
const paths = require('./paths');

var config = env => {
    return {
        // entry: APP_DIR + '/index.tsx',
        entry: paths.appIndexFile,
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
