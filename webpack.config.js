'use strict';
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');


module.exports = function(webpackEnv) {
    let isProduction = webpackEnv.mode === "prod";
    let configuration = {
        mode: 'development', // production | development
        entry: {
            'bundle': './src/index.js',
        },

        output: {
            filename: '[name].js'
        },

        resolve: {
            alias: {
              "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
              "react/jsx-runtime": "react/jsx-runtime.js"
            }
        },
        
        module: {
            rules: [
              {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
              },
              {
                test: /\.scss$/,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader"
                ]
              },
              {
                test: /\.css$/,
                use:  [  'style-loader', 'css-loader']
              }
            ]
        },

        plugins: [
            //
        ],
    }

    if (isProduction) {
        configuration.devtool = 'none';
        
        configuration.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()]
        }
    }

    return configuration;
}