const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.svg$/,
              use: ['xml-loader'],
            },
            {
              test: /\.(png|woff|woff2)$/,
              use: ['url-loader'],
            },
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        port: 8080,
    },
    devtool: 'cheap-module-source-map',
}
