var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// webpack.config.js
module.exports = {
  entry: './src/index.js',

  output: {
    path: './dist',
    filename: 'bundle.js'
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
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  externals: {
    'vue': 'Vue'
  },

  plugins: [
    new ExtractTextPlugin("style.css")
  ]
};