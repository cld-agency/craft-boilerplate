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

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

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
	gulp.src(srcFolder + '/sass/style.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.on('error', function(err) { gutil.log('Line: ' + err.lineNumber + ' - ' + err.message); gutil.beep(); })
		.pipe(autoprefixer())
		.pipe(gulp.dest(compiledFolder+'/css')) // Duplicated as work-around for browserSync and file rev issues
		.pipe(browserSync.reload({ stream: true }))
		.pipe(rev())
		.pipe(gulp.dest(compiledFolder+'/css'))
		.pipe(rev.manifest('rev-manifest.json',{merge:true}))
		.pipe(gulp.dest(process.cwd()));
});
// clear any previous revved CSS files based on their name of style-*
gulp.task('del-revs-css', function () {
	return del([compiledFolder + '/css' + '/**/style-*']);
});

// --------------------------------------------
// SCRIPTS
// --------------------------------------------

gulp.task('scripts',['del-revs-js'], function(){
	gulp.src(srcFolder + '/js/*.js')
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
});
// clear any previous revved JS files based on their name of js-*
gulp.task('del-revs-js', function () {
	return del([compiledFolder + '/js' + '/**/js-*']);
});

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
