
var path = require('path');

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
        loader: 'babel',
        include: [
          path.resolve(__dirname, "src")
        ]
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'sass',
        ],
        include: [
          path.resolve(__dirname, "src")
        ]
      },
    ]
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  externals: {
    'vue': 'Vue'
  },
};