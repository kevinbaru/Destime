const webpack = require('webpack');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )


module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  plugins: [
        new NodemonPlugin(),
    ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      { test: /\.css$/,
         use: ['style-loader','css-loader'] },
         {
         test: /\.(jpe?g|png|gif|svg)$/i,
         use: [
           'url-loader?limit=10000',
           'img-loader'
         ]
       },
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
