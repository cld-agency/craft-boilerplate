var gulp = require('gulp');

// --------------------------------------------
// ENVIRONMENT VARS
// --------------------------------------------

var localHost = 'example.test';
var compiledFolder = 'public_html/assets';
var srcFolder = 'src';
var tmplFolder = 'templates';

// --------------------------------------------
// PLUGINS
// --------------------------------------------

var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rev = require('gulp-rev');
var del = require('del');
var fs = require("fs");

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

function mergeConflict() {
   // check if the rev-manifest has merge conflict markers.
   // If so we'll need to trigger both scripts and styles tasks
   var manifestContent = fs.readFileSync('rev-manifest.json', 'utf8');
   return manifestContent.indexOf('<<<<') === -1 ? false : true;
}

// --------------------------------------------
// BROWSER SYNC
// --------------------------------------------

gulp.task('browser-sync', function() {
  browserSync({
    proxy: localHost,
    reloadOnRestart: false, // https://github.com/BrowserSync/browser-sync/issues/386
    open: false
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

// --------------------------------------------
// STYLES
// --------------------------------------------

gulp.task('styles',['del-revs-css'], function(){
   if (mergeConflict()){
      _scripts();
      _styles();
   } else {
      _styles();
   }
});
// clear any previous revved CSS files based on their name of style-*
gulp.task('del-revs-css', function () {
   return del([compiledFolder + '/css' + '/**/style-*']);
});

function _styles(){
   return gulp.src(srcFolder + '/sass/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', function(err) { gutil.log('Line: ' + err.lineNumber + ' - ' + err.message); gutil.beep(); })
        .pipe(autoprefixer({ grid:true }))
        .pipe(gulp.dest(compiledFolder+'/css')) // Duplicated as work-around for browserSync and file rev issues
        .pipe(browserSync.reload({ stream: true }))
        .pipe(rev())
        .pipe(gulp.dest(compiledFolder+'/css'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(rev.manifest('rev-manifest.json',{merge:true}))
        .pipe(gulp.dest(process.cwd()));
}

// --------------------------------------------
// SCRIPTS
// --------------------------------------------

gulp.task('scripts',['del-revs-js'], function(){
   if (mergeConflict()){
    _scripts();
    _styles();
   } else {
    _scripts();
   }
});

// clear any previous revved JS files based on their name of js-*
gulp.task('del-revs-js', function () {
   return del([compiledFolder + '/js' + '/**/js-*']);
});

function _scripts(){
   return gulp.src(srcFolder + '/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
        .pipe(uglify())
        .on('error', function(err) { gutil.log(err.message);gutil.beep(); })
        .pipe(concat('js.min.js'))
        .pipe(rev())
        .pipe(gulp.dest(compiledFolder+'/js'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(rev.manifest('rev-manifest.json',{merge:true}))
        .pipe(gulp.dest(process.cwd()));
}

// --------------------------------------------
// IMAGE MINIFIER
// --------------------------------------------

gulp.task('images', function () {
   return gulp.src(compiledFolder + '/img/**/*')
              .pipe(imagemin([
                      imagemin.gifsicle({interlaced: true}),
                      imagemin.jpegtran({progressive: true}),
                      imagemin.optipng({optimizationLevel: 5}),
                      imagemin.svgo({
                        plugins: [
                          {removeViewBox: false}
                        ]
                      })
                    ]))
              .pipe(gulp.dest(compiledFolder + '/img'));
});

// --------------------------------------------
// WATCH
// --------------------------------------------

gulp.task('watch', function(){
  gulp.watch(srcFolder + '/sass/**/*.scss', ['styles']);
  gulp.watch(tmplFolder + '/**/*', ['bs-reload']);
  gulp.watch(srcFolder + '/js/*', ['scripts']);
});

// --------------------------------------------
// DEFAULT TRIGGER (typing 'gulp' at command line triggers these tasks)
// --------------------------------------------

gulp.task('default', ['styles', 'scripts', 'watch', 'browser-sync']);