var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var rm = require('rimraf');
var webpack = require('webpack');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

var webpackConfig = require('./webpack.config');

var config = {
  src: './src',
  dest: './dist'
};

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

gulp.task('index-html', () => {
  return gulp.src(config.src + '/index.html')
    .pipe(gulp.dest(config.dest));
});

gulp.task('clean', next => {
  rm(config.dest, function () {
    next();
  });
});

gulp.task('watch', () => {
  gulp.watch(config.src + '/**/*.*', ['webpack']).on('change', reload);
  gulp.watch(config.src + '/index.html', ['index-html']).on('change', reload);
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
          handle: function (req, res) {
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

  gulp.watch('./mock/data.js').on('change', () => {
    browserSync.exit();
    startServer();
  });
});

gulp.task('build', gulpSequence('clean', ['webpack', 'index-html']));

gulp.task('dev', gulpSequence('build', ['dev-server', 'watch']));


