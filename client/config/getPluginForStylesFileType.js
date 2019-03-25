const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');

const paths = require('./paths');

module.exports = function getPluginForStylesFileType(fileType) {
    const loaders = [
        {
            loader: require.resolve('style-loader'),
            options: {
                sourceMap: true,
            },
        },
        {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
                sourceMap: true,
                modules: fileType === 'scss',
                localIdentName: '[name]__[local]___[hash:base64:5]',
            },
        },
    ];

    if (fileType === 'less') {
        loaders.shift();
    }

    const loader = fileType === 'less' ? require.resolve('less-loader') : require.resolve('sass-loader');

    const postCssParser = fileType === 'less' ? require.resolve('postcss-less') : require.resolve('postcss-scss');

    loaders.push({
        loader: require.resolve('postcss-loader'),
        options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: loader => [autoprefixer()],
            parser: postCssParser,
        },
    });

    loaders.push({
        loader,
        options: {
            sourceMap: true,
            sourceComments: true,
            includePaths: [paths.appSrc],
        },
    });

    return new HappyPack({
        id: `styles-${fileType}`,
        threads: 3,
        loaders,
    });
};
