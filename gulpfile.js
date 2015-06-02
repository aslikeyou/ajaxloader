var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('default', function() {
    return gulp.src('loader.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min" + path.extname
        }))
        .pipe(gulp.dest('./'));
});