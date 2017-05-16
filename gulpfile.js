const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

gulp.task('build', function() {
    return gulp.src('./src/AEffect.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task("default", function(){
    console.log("Now watching on changes.");
    gulp.watch("./src/*.js", ["build"]);
});