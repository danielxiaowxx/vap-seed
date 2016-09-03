var gulp = require('gulp');
var gulpSequence = require('gulp-sequence')
var rm = require('rimraf');
var webpack = require('webpack');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

var webpackConfig = require('./webpack.config');

var config = {
  src: './src',
  dest: './dist',
  framework: ['./node_modules/vue/dist/vue.min.js'],
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

gulp.task('static', () => {
  return gulp.src([config.src + '/index.html'].concat(config.framework))
    .pipe(gulp.dest(config.dest));
});

gulp.task('clean', next => {
  rm(config.dest, function() {
    next();
  });
});

gulp.task('watch', () => {
  gulp.watch(config.src + '/**/*.*', ['webpack']).on('change', reload);
  gulp.watch(config.src + '/index.html', ['static']).on('change', reload);
});

gulp.task('dev-server', () => {
  browserSync.init({
    server: './dist',
    index: 'index.html',
    port: 3000,
    logLevel: 'debug',
    logPrefix: 'VA',
    open: true
  });
});

gulp.task('build', gulpSequence('clean', ['webpack', 'static']));

gulp.task('dev', gulpSequence('build', ['dev-server', 'watch']));


