const gulp = require("gulp");
const { series } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const del = require("del");

// Styles
function styles() {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist"));
}

function minify() {
  return gulp
    .src("dist/*.css")
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("dist"));
}

function clean() {
  return del("dist/**", { force: true });
}

function watch(event) {
  gulp.watch("src/**/*.scss", styles);
}

exports.clean = clean;
exports.styles = styles;
exports.watch = watch;
exports.build = series(clean, styles, minify);
exports.default = series(clean, styles);
