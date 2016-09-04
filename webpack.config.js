var path = require('path');
var webpack = require('webpack');
var postcssSprites = require('postcss-sprites');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// webpack.config.js
module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['vue', 'vue-resource'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        include: [
          path.resolve(__dirname, "src")
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        include: [
          path.resolve(__dirname, "src")
        ]
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          // inline files smaller then 10kb as base64 dataURL
          limit: 10000,
          // fallback to file-loader with this naming scheme
          name: 'img/[name].[ext]?[hash]'
        },
        include: [
          path.resolve(__dirname, "src")
        ]
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
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity
    })
  ]
};