var path = require('path');

var root = process.cwd();

module.exports = {
  root: root,
  src: path.join(root, 'src'),
  dist: path.join(root, 'dist'),
  babelModules: ['lodash-es'].map(item => path.join(root, 'node_modules', item)),
  vueModules: [].map(item => path.join(root, 'node_modules', item)),
};

