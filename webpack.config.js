'use strict';

const path = require('path');
const webpack = require('webpack');

/* Extra plugins */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const isDev = false;

const replacements = [
    {
        pattern: /\$\$KEY/ig,
        replacement: () => process.env.KEY || 'any-value'
    }
];

const devServerConfig = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    contentBase: path.resolve(__dirname, 'public')
};

let plugins = [
    new ExtractTextPlugin('styles.css'),
    new StringReplacePlugin()
];

if (!isDev) plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

const webpackInitialization = function (env) {
    const isDev = !env || (env && !env.prod);
    const definitions = new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
    });

    const plugins = [
        new ExtractTextPlugin('styles.css'),
        new StringReplacePlugin(),
        definitions
    ];

    if (!isDev) plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

    return {
        entry: {
            app: (isDev ? [`webpack-dev-server/client?http://${devServerConfig.host}:${devServerConfig.port}/`] : [])
                .concat([path.resolve(__dirname, 'client/app.jsx')])
        },

        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'public')
        },

        cache: isDev,
        devtool: isDev ? 'eval-source-map' : false,
        watch: isDev,

        resolve: {
            modules: [
                path.resolve(__dirname, 'client'),
                path.resolve(__dirname, 'client/assets'),
                path.resolve(__dirname, 'node_modules')
            ],
            extensions: ['.js', '.jsx', '.styl', '.html']
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: StringReplacePlugin.replace({
                        replacements: replacements
                    })
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.styl$/,
                    exclude: /node_modules/,
                    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!stylus-loader'})
                },
                {
                    test: /\.(png|jpg)\??/,
                    loader: 'url-loader?limit=100&name=images/[name].[ext]'
                },
                {
                    test: /\.(html)\??/,
                    loader: 'file-loader?name=[name].[ext]'
                }
            ]
        },

        plugins: plugins,
        devServer: devServerConfig
    }
};

module.exports = webpackInitialization;
