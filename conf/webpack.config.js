/**
 * Created by daniel on 16/9/6.
 */

var devConfig = require('./webpack.config.dev');
var prdConfig = require('./webpack.config.prd');

var env = process.env.NODE_ENV;
if (env === 'production') {
  module.exports = Object.assign(devConfig, prdConfig);
} else {
  module.exports = devConfig;
}
