'use strict';

const CleanWebpackPlugin   = require('clean-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const paths                = require('./paths');
const helpers              = require('./helpers');

const ManifestPlugin       = require('webpack-manifest-plugin');
const StatsWriterPlugin    = require("webpack-stats-plugin").StatsWriterPlugin;


const isDev                = process.env.NODE_ENV !== 'production';
const publicPath           = paths.publicPath;

module.exports = {
    entry: {
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts',
        main: isDev ? './src/main.ts' : './src/main.aot.ts',

    },

    output: {
        path: paths.clientLibRoot,
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: publicPath,
    },

    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: isDev } },
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'assets')
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'to-string-loader',
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'app')
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(
            helpers.root('dist'), { root: helpers.root(), verbose: true }),
        new StatsWriterPlugin({
            stats: { publicPath: true, chunkGroups: true },
            fields: ['assetsByChunkName', 'assets', 'hash', 'publicPath', 'namedChunkGroups']
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: publicPath,
        })
    ]
};