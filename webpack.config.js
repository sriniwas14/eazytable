const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx', // Path to your main TypeScript + JSX file
    output: {
        filename: 'index.js', // Output bundle filename
        path: path.resolve(__dirname, 'dist'), // Output directory
        publicPath: '/dist/', // Public URL path for assets
        libraryTarget: 'commonjs2'

    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'] // Allow importing TypeScript files without specifying the extension
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader' // Use TypeScript loader for .ts and .tsx files
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader' // Compiles Sass to CSS
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'eazytable.css' // Output CSS filename
        })
    ],
    mode: process.env.MODE || 'development'
};
