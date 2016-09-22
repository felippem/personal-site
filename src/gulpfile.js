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
  clean = require('gulp-clean');

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
gulp.task('css', function () {
  return gulp.src('./assets/**/*.css')
    .pipe(concat('all.min.css'))
    .pipe(gutil.env.type === 'production' ? cleancss({ compatibility: 'ie8' }) : gutil.noop())
    .pipe(gulp.dest('./public/stylesheets'));
});

/**
 * Task responsável por concatenar os arquivos .js de terceiros.
 * Use: $ gulp concat-vendor-js
 */
gulp.task('concat-vendor-js', function () {
  gulp.src('public/lib/*.*', { read: false })
        .pipe(clean({ force: true }));

  return gulp.src(['./bower_components/**/dist/**/*.min.js', 
    './bower_components/angular/*.min.js',
    '!./bower_components/**/*slim.*'])
    .pipe(rename({ dirname: '' }))
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('public/libs'));
});

/**
 * Task responsável por concatenar os arquivos .css de terceiros.
 * Use: $ gulp concat-vendor-css
 */
gulp.task('concat-vendor-css', function () {
  gulp.src('public/lib/**/*.*', { read: false })
        .pipe(clean({ force: true }));

  return gulp.src(['./bower_components/**/dist/**/*.min.css', 
    '!./bower_components/**/dist/**/*-theme*'])
    .pipe(rename({ dirname: '' }))
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('public/libs/css'));
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
gulp.task('exec', ['sass', 'js', 'inject-vendor'], function () {
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
 * Use: $ gulp inject-vendor-js
 */
gulp.task('inject-vendor', ['concat-vendor-js', 'concat-vendor-css'], function () {
  var sources = gulp.src(['public/libs/*.*', 'public/libs/**/*.*'], { read: false, relative: true });
  
  return gulp.src('views/**/index.*')
    .pipe(inject(sources, { ignorePath: 'public', addRootSlash: true }))
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
  return gulp.src('./assets/**/*.js')
    .pipe(babel({
      presets: [es2015]
    }))
    .pipe(concat('all.min.js'))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(gulp.dest('./public/javascripts'));
});

/**
 * Task responsável por pré-processar os arquivos .scss para .css.
 * Use: $ gulp sass @optional-parameters
 *  @optional-parameters: --type production
 */
gulp.task('sass', ['css', 'sass:watch'], function () {
  var options = {
    errLogToConsole: false,
    outputStyle: 'compressed'
  };

  return gulp.src('./assets/sass/*.scss')
    .pipe(sass(gutil.env.type === 'production' ? options : null).on('error', sass.logError))
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
 */
gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass', 'browsersync']);
});