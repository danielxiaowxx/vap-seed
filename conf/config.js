var path = require('path');

var root = process.cwd();

module.exports = {
  root: root,
  src: path.join(root, 'src'),
  dist: path.join(root, 'dist'),
  babelModules: ['va-commonjs/src', 'lodash-es'].map(item => path.join(root, 'node_modules', item)),
  vueModules: ['va-component/src'].map(item => path.join(root, 'node_modules', item)),
};

