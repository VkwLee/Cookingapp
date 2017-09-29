var webpack = require('webpack');

module.exports = {

    entry: './client/js/main.jsx',
    devServer: {
        inline: true,
        contentBase: './src',
        port: 8080
    },
    module: {
        loaders : [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: 'src',
        filename: 'js/bundle.min.js'
    }
};
