var gulp = require('gulp');

// --------------------------------------------
// ENVIRONMENT VARS
// --------------------------------------------

var localHost = 'example.dev';
var compiledFolder = 'public_html/assets';
var srcFolder = 'src';
var tmplFolder = 'craft/templates';

// --------------------------------------------
// PLUGINS
// --------------------------------------------

var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var svgSprite = require('gulp-svg-sprite');
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
               .pipe(autoprefixer())
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
	return gulp.src(srcFolder + '/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(compiledFolder + '/img'));
});

// --------------------------------------------
// SVG SPRITE GENERATOR (also minifies SVG)
// --------------------------------------------

gulp.task('icons', function(){
	return gulp.src(srcFolder + '/svg/*.svg')
		.pipe(svgSprite({
			'mode': {
				'symbol': {
					'inline': true,
					'dest': 'svg-sprite',
					'example': {
						'dest': 'preview.html'
					},
					'sprite': 'svg-sprite.html',
				}
			},
			'shape': {
        		transform: [{
					svgo: {
						plugins: [
							{ removeTitle: true }
						]
					}
				}]
			}
		}))
		.pipe(gulp.dest(tmplFolder + '/_partials'));
});

// --------------------------------------------
// WATCH
// --------------------------------------------

gulp.task('watch', function(){
	gulp.watch(srcFolder + '/sass/**/*.scss', ['styles']);
	gulp.watch(srcFolder + '/icons/*.svg', ['icons']);
	gulp.watch(tmplFolder + '/**/*', ['bs-reload']);
	gulp.watch(srcFolder + '/js/*', ['scripts']);
});

// --------------------------------------------
// DEFAULT TRIGGER (typing 'gulp' at command line triggers these tasks)
// --------------------------------------------

gulp.task('default', ['styles', 'scripts', 'watch', 'browser-sync']);
