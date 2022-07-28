'use strict';

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const bs = require('browser-sync').create();
const postCss = require('gulp-postcss');

function browserSync() {
  buildStyles();

  bs.init({
    server: {
      baseDir: './',
    },
  });

  watch('*.html').on('change', bs.reload);
  watch('./scss/**/*.scss', buildStyles);
  watch('js/*.js').on('change', bs.reload);
}

function buildStyles() {
  return src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postCss([require('autoprefixer')]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./css'))
    .pipe(bs.stream());
}

exports.serve = browserSync;
exports.default = series(buildStyles);

// exports.default = function () {
//   series(buildStyles);
// };
