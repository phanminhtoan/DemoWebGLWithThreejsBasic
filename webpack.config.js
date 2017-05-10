var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        // "babel-polyfill", // require for more compatible
        './js/main.js'  //Change to main js
    ],
    output: {
        path: __dirname + "/.release",
        filename: "main.js",
        publicPath: "/"
    },
    module: {
        loaders: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ["es2015", "stage-0"],
                plugins: ['transform-object-assign']
            }
        },
        {
            test: /\.glsl$/,
            loader: 'webpack-glsl-loader'
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
        }),
        new webpack.DefinePlugin(
        {
          'ADS_SERVER_URL': JSON.stringify(process.env.ADS_SERVER_URL),
          'ADS_TYPE': JSON.stringify(process.env.ADS_TYPE),
          'IS_RELEASE': !JSON.stringify(process.env.ADS_TYPE).includes('LOCAL'),
        }),
        // new CopyWebpackPlugin([
        //     { from: 'data', to:"data" } //copy static assets if needed
        // ])
    ],
    resolveLoader:{
        // modules: [path.join(process.env.NODEJS, 'node_modules'),process.env.NODE_PATH,path.resolve("./node_modules")],
    },
    resolve: {
        //modules: [path.join(process.env.NODEJS, 'node_modules'),process.env.NODE_PATH,path.resolve("./node_modules")],
    }
};