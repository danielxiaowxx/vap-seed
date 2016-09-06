/**
 * Created by daniel on 16/9/6.
 */

var path = require('path');

var root = process.cwd();

module.exports = {
  root: root,
  src: path.join(root, '/src'),
  dist: path.join(root, '/dist')
};
