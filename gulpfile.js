const { src, dest, series, parallel, watch } = require('gulp');
							   babel = require('gulp-babel'),
							  concat = require('gulp-concat'),
						 browserSync = require('browser-sync'),
						   	  uglify = require('gulp-uglify'),
						    	less = require('gulp-less'),
						autoprefixer = require('gulp-autoprefixer'),
							 cssnano = require('gulp-cssnano'),
						    filesize = require('gulp-filesize'),
							imagemin = require('gulp-imagemin'),
							 plumber = require('gulp-plumber'),
							  rename = require('gulp-rename');

const server = browserSync.create();

var paths = {
	css: './app/src/css/**/*.css',
	js: './app/src/js/lib/*.js',
	img: './app/src/img/*',
	less: './app/src/less/*.less'
};
var localhost = 'site.loc';
function reload(done) {
  server.reload();
  done();
}

function serve() {
  server.init({
	  server: {
	        baseDir: "./app/"
	      },
	      port: 3000,
	      notify: false
  });
}

function css_lib() {
	return src(paths.css)
		.pipe(plumber())
		.pipe(concat('lib.css'))
		.pipe(filesize())
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(dest('./app/dist/lib/'))
		.pipe(filesize())
		.pipe(plumber.stop())
}

function css() {
    return src(paths.less)
        .pipe(less([autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }) ]))
        .pipe(concat('styles.css'))
        // .pipe(dest('./app/dist/', {
        //     overwrite:true
        // }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./app/dist/', {
            overwrite:true
        }))
}

function imagemin() {
	return src(paths.img)
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(dest('./app/dist/img/'))
	.pipe(plumber.stop())
}

function scripts() {
	return src(paths.js, { sourcemaps: true })
		.pipe(plumber())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('lib.min.js'))
		.pipe(dest('./app/dist/lib/'), { sourcemaps: true })
		.pipe(plumber.stop())
}

function main_script() {
	return src('./app/src/js/*.js', { sourcemaps: true })
		.pipe(plumber())
		.pipe(babel())
		.pipe(uglify())
		.pipe(dest('./app/dist/'), { sourcemaps: true })
		.pipe(plumber.stop())
}

function watchFiles(done) {
		watch(paths.img, series(imagemin, reload));
		watch('./app/src/js/*.js', series(main_script, reload));
		watch(paths.js, series(scripts, reload));
		watch(paths.css, series(css_lib, reload));
		watch(paths.less, series(css, reload));
		watch("./app/*.html", reload);
	done();
}

exports.imagemin = imagemin;
exports.css_lib = css_lib;
exports.css = css;
exports.scripts = scripts;

exports.default = parallel(watchFiles, serve);
