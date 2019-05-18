/* eslint-disable no-console */
/* eslint-disable no-undef */
const gulp           = require('gulp');
const sass           = require('gulp-sass');
const autoprefixer   = require('gulp-autoprefixer');
const browserSync    = require('browser-sync').create();
const eslint         = require('gulp-eslint');
const jasmineBrowser = require('gulp-jasmine-browser');
const concat         = require('gulp-concat');
const uglify         = require('gulp-uglify');
const babel          = require('gulp-babel');
const sourcemaps     = require('gulp-sourcemaps');

//===========================================================================

// to load all piped elements on the browser
gulp.task("default", ["styles" , "lint" , "copy-html" , "copy-js" , "copy-fonts", "tests"] , function() {
  // code for your default task goes here
  console.log('Gulp is working!');

  gulp.watch("./index.html" , ["copy-html"]);

  gulp.watch("sass/**/*.scss", ["styles"]);

  gulp.watch("js/**/*.js" , ["lint" ,"copy-js"]);

  gulp.watch("fonts/**/*" , ["copy-fonts"]);

  gulp.watch("jasmine/**/*" , ["tests"]);

  browserSync.init({
    server: "./dist"
  });
});

gulp.task('dist', ["styles" , "lint" , "copy-html" , "copy-js" , "copy-fonts" , "scripts-dist", "tests"]);

//===========================================================================

//To pipe needed elements into "dist" folder
gulp.task("styles", function() {
  console.log('Gulp styles is working!');

  gulp.src('sass/**/*.scss')
      .pipe(sass({outputStyle : 'compressed'}))
      .on('error', sass.logError)
      .pipe( autoprefixer({
            browsers: ["last 2 versions"]
          })
        )
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
});

gulp.task("copy-html" , function(){
  gulp.src('./index.html')
      .pipe(gulp.dest('./dist'));
});

gulp.task("copy-js" , function(){
  gulp.src('js/**/*.js')
      .pipe(gulp.dest('./dist/js'));
});

gulp.task("copy-fonts" , function(){
  gulp.src('fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'));
});

// gulp.task("tests" , function(){
//   gulp.src('jasmine/**/*.js')
//       .pipe(gulp.dest('./dist/jasmine'));
// })

gulp.task("lint", function() {

  console.log('Gulp lint is working!');

  return (
      gulp
          .src(['js/**/*.js/app.js'])
          // eslint() attaches the lint output to the eslint property
          // of the file object so it can be used by other modules.
          .pipe(eslint())
          // eslint.format() outputs the lint results to the console.
          // Alternatively use eslint.formatEach() (see Docs).
          .pipe(eslint.format())
          // To have the process exit with an error code (1) on
          // lint error, return the stream and pipe to failOnError last.
          .pipe(eslint.failOnError())
  );
});

gulp.task("tests", function() {

  console.log('Gulp teats is working!');

  gulp.src('jasmine/spec/feedreader.js')
      .pipe(gulp.dest('./dist/jasmine/spec'));

  return (
      gulp
          .src('jasmine/spec/feedreader.js')
          .pipe(jasmineBrowser.specRunner({ console: true }))
          .pipe(jasmineBrowser.headless({ driver: 'chrome' }))
          // .pipe(jasmineBrowser.specRunner())
          // .pipe(jasmineBrowser.server({ port: 3001 }))
  );
});
//===========================================================================

gulp.task("scripts" , function(){
  gulp.src('js/**/*.js')
      .pipe(babel())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task("scripts-dist" , function(){
  gulp.src('js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/js'));
});

//===========================================================================


