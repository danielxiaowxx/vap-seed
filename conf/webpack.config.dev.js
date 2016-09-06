var path = require('path');
var webpack = require('webpack');
var postcssSprites = require('postcss-sprites');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./config');

// webpack.config.js
module.exports = {
  entry: {
    app: path.join(config.src, 'index.js'),
    vendor: ['vue', 'vue-resource'],
  },

  output: {
    path: config.dist,
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        include: [config.src]
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        include: [config.src]
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          // inline files smaller then 10kb as base64 dataURL
          limit: 10000,
          // fallback to file-loader with this naming scheme
          name: 'img/[name].[ext]'
        },
        include: [config.src]
      }
    ]
  },

  vue: {
    loaders: {
      sass: ExtractTextPlugin.extract('css!postcss!sass'),
      scss: ExtractTextPlugin.extract('css!postcss!sass'),
      css: ExtractTextPlugin.extract('css!postcss'),
      js: 'babel!eslint'
    },
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  plugins: [
    // extract style file
    new ExtractTextPlugin("style.css"),

    // extract vendor libs
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity
    }),

    // handle index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(config.src, 'index.html'),
      inject: true,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ]
};
