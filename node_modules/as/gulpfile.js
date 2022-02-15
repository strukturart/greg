/*jshint node: true, globalstrict: true */
"use strict";


// Imports
// -------------------------------------------------------------------------------------------------

var del = require("del");

var gulp = require("gulp");
var to5 = require("gulp-6to5");


// Configuration
// -------------------------------------------------------------------------------------------------

var settings =
  { scripts:
    { source: "source/{index,array,object}.js"
    , target:
      { es5: "."
      , es6: "./dist.es6"
      , test: "./test.modules"
      }
    }
  };




// Tasks
// =================================================================================================


// `gulp`
// -------------------------------------------------------------------------------------------------

gulp.task("default", ["build"]);


// `gulp build`
// -------------------------------------------------------------------------------------------------
gulp.task("build", ["scripts"]);


// `gulp scripts`
// -------------------------------------------------------------------------------------------------

gulp.task("scripts", ["scripts:es6", "scripts:es5"]);

gulp.task("scripts:es6", function () {
  return gulp.src(settings.scripts.source)
    .pipe(gulp.dest(settings.scripts.target.es6))
    ;
});

gulp.task("scripts:es5", function () {
  return gulp.src(settings.scripts.source)
    .pipe(to5({modules: "umd"}))
    .pipe(gulp.dest(settings.scripts.target.es5))
    ;
});


// `gulp prepare-test`
// -------------------------------------------------------------------------------------------------

gulp.task("prepare-test", function () {
  return gulp.src(settings.scripts.source)
    .pipe(to5({modules: "common"}))
    .pipe(gulp.dest(settings.scripts.target.test))
    ;
});


// `gulp teardown-test`
// -------------------------------------------------------------------------------------------------

gulp.task("teardown-test", function (done) {
  del("test.modules", done);
});
