var gulp = require('gulp');
var path = require('path');
var gulpSequence = require('gulp-sequence');
var rm = require('rimraf');
var webpack = require('webpack');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

var config = require('./conf/config');
var webpackConfig = require('./conf/webpack.config');


var reload = browserSync.reload;


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'compile error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

gulp.task('webpack', done => {
  webpack(webpackConfig, err => {
    if (err) {
      handleErrors();
    }
    done();
  });
});


gulp.task('clean', next => {
  rm(config.dist, () => next());
});

gulp.task('watch', () => {
  gulp.watch([path.join(config.src, '**/*.*'), path.join(config.src, 'index.html')], ['webpack']).on('change', reload);
});

gulp.task('dev-server', () => {

  function startServer() {
    delete require.cache[require.resolve('./mock/data')];
    var mockConfig = require('./mock/data');
    browserSync.init({
      server: './dist',
      index: 'index.html',
      port: 3000,
      logLevel: 'debug',
      logPrefix: 'VA',
      open: true,
      middleware: Object.keys(mockConfig).map(route => {
        return {
          route: route,
          handle: (req, res) => {
            var resData = typeof mockConfig[route] === 'function' ? mockConfig[route]() : mockConfig[route];
            res.write(typeof resData === 'string' ? resData : JSON.stringify(resData));
            res.end();
            return;
          }
        }
      })
    });
  }

  startServer();

  gulp.watch(path.join(config.root, 'mock/data.js')).on('change', () => {
    browserSync.exit();
    startServer();
  });
});

gulp.task('build', gulpSequence('clean', ['webpack']));

gulp.task('dev', gulpSequence('build', ['dev-server', 'watch']));


