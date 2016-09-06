var path = require('path');
var webpack = require('webpack');
var postcssSprites = require('postcss-sprites');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./config');

// webpack.config.js
module.exports = {

  output: {
    path: config.dist,
    filename: '[name].[chunkhash:8].js',
  },

  plugins: [
    // extract style file
    new ExtractTextPlugin("style.[contenthash:8].css"),

    // compress js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // extract vendor libs
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.[chunkhash:8].js",
      minChunks: Infinity
    }),

    // handle index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(config.src, 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ]
};
