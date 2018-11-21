const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const imgmin = require("gulp-imagemin");
const imageCompress = require("gulp-image");

// Compress images
gulp.task("compressImages", function() {
   gulp
      .src("src/img/*")
      .pipe(imgmin())
      .pipe(imageCompress())
      .pipe(gulp.dest("dest/img"));
});

// Compile Sass
gulp.task("sass", () => {
   gulp
      .src("src/scss/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

// Watch & serve
gulp.task("serve", () => {
   gulp.watch("src/scss/**/*.scss", ["sass"]);
   gulp.watch("src/*.html").on("change", browserSync.reload);

   browserSync.init({
      server: "./src"
   });
});

// Final build
gulp.task("build", ["compressImages", "sass"], () => {
   gulp.src("src/index.html").pipe(gulp.dest("dest"));

   gulp
      .src("src/css/*.css")
      .pipe(
         autoprefixer({
            browsers: ["last 5 versions"]
         })
      )
      .pipe(cssmin())
      .pipe(gulp.dest("dest/css"));
});

gulp.task("default", ["serve"]);
