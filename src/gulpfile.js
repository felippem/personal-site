var gulp = require('gulp'),
  sass = require('gulp-sass'),
  nodemon = require('nodemon'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  es2015 = require('babel-preset-es2015'),
  babel = require('gulp-babel'),
  cleancss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  gutil = require('gulp-util'),
  browsersync = require('browser-sync').create(),
  inject = require('gulp-inject'),
  clean = require('gulp-clean'),
  autoprefixer = require('gulp-autoprefixer');

var timestamp = new Date().getTime();

/**
 * Task responsável por executar a sincronização com o browser.
 * Use: $ gulp browsersync 
 */
gulp.task('browsersync', function () {
  browsersync.init({
    proxy: "localhost:3000",
    ui: false
  });
});

/**
 * Task responsável por concatenar e minificar o conteúdo dos aquivos .css.
 * Use: $ gulp css @optional-parameters
 *  @optional-parameters: --type production
 */
gulp.task('css', ['sass'], function () {
  return gulp.src('./assets/**/*.css')
    .pipe(concat('app.min.css'))
    .pipe(gutil.env.type === 'production' ? cleancss({ 
      compatibility: '*', // Internet Explorer 9+ 
      keepSpecialComments: 0 }) : gutil.noop())
    .pipe(gulp.dest('./public/stylesheets'));
});

/**
 * Task responsável por concatenar os arquivos .js de terceiros.
 * Use: $ gulp vendor-js
 */
gulp.task('vendor-js', function () {
  gulp.src('public/libs/*.*', { read: false })
    .pipe(clean({ force: true }));

  return gulp.src(['./bower_components/jquery/*.min.js',
    './bower_components/angular*/**/*.min.js',
    './bower_components/**/dist/**/*.min.js', 
    '!./bower_components/**/*slim.*',
    '!./bower_components/**/*migrate.*'])
    .pipe(rename({ dirname: '' }))
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('public/libs'));
});

/**
 * Task responsável por concatenar os arquivos .css de terceiros.
 * Use: $ gulp vendor-css
 */
gulp.task('vendor-css', function () {
  gulp.src('public/libs/css/*.*', { read: false })
    .pipe(clean({ force: true }));

  return gulp.src(['./bower_components/**/dist/**/*.min.css', 
    './bower_components/**/**/*.min.css',
    '!./bower_components/**/dist/**/*-theme*'])
    .pipe(rename({ dirname: '' }))
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('public/libs/css'))
    .on('end', function () {
      return gulp.src('./bower_components/**/fonts/*.*')
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('public/libs/fonts'));
    });
});

/**
 * Task responsável por executar a task @exec e simplificar 
 * a forma de execução das tasks.
 * Use: $ gulp @optional-parameters
 *  @optional-parameters: --type production
 */
gulp.task('default', ['exec']);

/**
 * Task responsável por executar o servidor através do Nodemon e 
 * todas as demais tasks responsáveis por compor os arquivos necessários
 * para execução do site.
 * Use: $ gulp exec @optional-parameters
 *  @optional-parameters: --type production
 */
gulp.task('exec', ['css', 'sass:watch', 'js', 'js:watch', 'inject-vendor', 'inject'], function () {
  return nodemon({
    script: 'server/server.js',
    env: { 'NODE_ENV': 'development' },
    ext: 'js ejs scss css', // Extensões monitoradas para reinicialização do servidor.
    tasks: []
  }).on('restart', function () {
    console.log('Nodemon server restarted');
  });
});

/**
 * Task responsável por injetar os .js e .css de terceiros, nas views.
 * Use: $ gulp inject-vendor
 */
gulp.task('inject-vendor', ['vendor-js', 'vendor-css'], function () {
  var sources = gulp.src(['public/libs/*.*', 'public/libs/**/*.*'], { read: false, relative: true });
  
  return gulp.src('views/**/index.*')
    .pipe(inject(sources, { ignorePath: 'public', name: 'vendor', addRootSlash: true }))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

/**
 * Task responsável por injetar os .js e .css, nas views.
 * Use: $ gulp inject
 */
gulp.task('inject', function () {
  var sources = gulp.src(['!public/libs/*.*', '!public/libs/**/*.*', 
    'public/**/*.js', 'public/**/*.css'], { read: false, relative: true });
  
  return gulp.src('views/**/index.*')
    .pipe(inject(sources, { ignorePath: 'public', addRootSlash: true, addSuffix: '?' + timestamp }))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

/**
 * Task responsável por transpilar, concatenar e minificar os arquivos .js.
 * Obs: A transipilação é realizada através do gulp-babel, assim, qualquer feature
 * do ES6, será convertida para a última versão do ES, sendo assim compatível com os
 * navegadores que ainda não suportam o ES6.
 * Use: $ gulp js @optional-parameters
 *  @optional-parameters: --type production
 */
gulp.task('js', function () {
  return gulp.src(['./assets/modules/app.js', './assets/modules/app.run.js', 
    './assets/**/*.module.js', './assets/**/*.service.js', './assets/**/*.controller.js'])
    .pipe(babel({
      presets: [es2015]
    }))
    .pipe(concat('app.min.js'))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(gulp.dest('./public/javascripts'));
});

/**
 * Task responsável por monitorar qualquer atualização nos arquivos .js em assets.
 * Use: $ gulp js:watch @optional-parameters
 *  @optional-parameters: --type production
 */
gulp.task('js:watch', function () {
  gulp.watch('./assets/**/*.js', ['js']);
});

/**
 * Task responsável por pré-processar os arquivos .scss para .css.
 * Use: $ gulp sass @optional-parameters
 *  @optional-parameters: --type production
 */
gulp.task('sass', function () {
  var options = {
    errLogToConsole: false,
    outputStyle: 'compressed'
  };

  return gulp.src('./assets/sass/*.scss')
    .pipe(sass(gutil.env.type === 'production' ? options : null).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename('processed.css'))
    .pipe(gulp.dest('./assets/stylesheets'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

/**
 * Task responsável por monitorar qualquer atualização nos arquivos .scss,
 * transpilar e sincronizar o browser através do browser-sync.
 * Use: $ gulp sass:watch @optional-parameters
 *  @optional-parameters: --type production
 *  @optional-parameters: --sync => 
 *    Ativa a sincronização com o browser, quando os arquivos sass são modificados.
 */
gulp.task('sass:watch', function () {
  if (!gutil.env.sync) {
    gulp.watch('./assets/sass/**/*.scss', ['css']);
  } else {
    gulp.watch('./assets/sass/**/*.scss', ['css', 'browsersync']);
  }
});