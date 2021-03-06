var gulp = require('gulp');
var path = require('path');
var rm = require('rimraf');
var qs = require('querystring');
var url = require('url');
var zip = require('gulp-zip');
var gulpif = require('gulp-if');
var webpack = require('webpack');
var notify = require('gulp-notify');
var replace = require('gulp-replace');
var gulpSequence = require('gulp-sequence');
var url = require('url');
var querystring = require('querystring');
var browserSync = require('browser-sync').create();

var config = require('./conf/config');
var webpackConfig = require('./conf/webpack.config');


var reload = browserSync.reload;

/* ====================== functions ====================== */

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'compile error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

/* ====================== gulp tasks ====================== */

gulp.task('webpack', done => {
  webpack(webpackConfig, err => {
    if (err) {
      console.error(err);
      handleErrors();
    }
    done();
  });
});

gulp.task('clean', next => {
  rm(config.dist, () => next());
});

gulp.task('watch', () => {
  gulp.watch([path.join(config.src, '**/*.*'), path.join(config.src, 'index.html')], () => {
    gulpSequence('webpack')(err => { !err && reload(); });
  });
});

gulp.task('serve', () => {

  function startServer() {
    delete require.cache[require.resolve('./mock/data')];
    var mockConfig = require('./mock/data');
    browserSync.init({
      server: './dist',
      index: 'index.html',
      // https: true,
      port: 3000,
      logLevel: 'debug',
      logPrefix: 'VA',
      open: true,
      middleware: Object.keys(mockConfig).map(route => {
        return {
          route: route,
          handle: (req, res) => {
            var body = [];
            req.on('data', function(chunk) {
              body.push(chunk);
            }).on('end', function() {
              body = JSON.parse(Buffer.concat(body).toString() || '{}');
              var query = querystring.parse(url.parse(req.url).query);
              var params = Object.assign(body, query);

              var resResult = '';
              var resData = typeof mockConfig[route] === 'function' ? mockConfig[route](params) : mockConfig[route];
              resResult = typeof resData === 'string' ? resData : JSON.stringify(resData);

              // 判断是否JSONP
              var urlObj = url.parse(req.url);
              var qsObj = qs.parse(urlObj.query);

              if (qsObj.callback) {
                resResult = `${qsObj.callback}(${resResult})`;
              }

              res.write(resResult);
              res.end();
              return;

            });

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

gulp.task('zip', () => {
  var package = require('./package.json');
  var env = process.env.NODE_ENV;
  var server = { // XXX 请根据实际情况修改不同环境的静态服务器和提供JSONP接口的服务域名
    sit: {
      static: '//static-domain.com',
      jsonp: '//api-domain.com',
      jsCssPath: ''
    },
    uat: {
      static: '//static-domain.com',
      jsonp: '//api-domain.com'
    },
    production: {
      static: '//static-domain.com',
      jsonp: '//api-domain.com'
    }
  }
  var envServer = server[env] || server.sit;
  return gulp.src(config.dist + '/**/*')
    .pipe(gulpif(file => {
      var fileName = file.path.replace(config.dist + path.sep, '');
      return fileName.match(/^app\.[a-z0-9]{8}\.js/);
    }, replace(/http.jsonp\([a-z]{1}\+"(.*?)"\)/, 'http.jsonp("' + envServer.jsonp + '$1")'))) // 替换JSONP请求路径。只处理app.js
    .pipe(gulp.dest(config.dist + '/pkg/' + package.name)) // 因为需要解压后有目录
    .on('end', () => {
      gulp.src(config.dist + '/pkg/**')
        .pipe(zip(package.name + '.zip'))
        .pipe(gulp.dest(config.dist));
    })
});

gulp.task('build', gulpSequence('clean', ['webpack']));

gulp.task('dev', gulpSequence('build', ['serve', 'watch']));
