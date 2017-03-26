// the gulp config
var gulp    = require('gulp'),
    changed = require('gulp-changed'),
    concat  = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    maps    = require('gulp-sourcemaps'),
    del     = require('del'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// the source files to work on
var inputs = {
    'libs' : [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    'scripts' : [
        'app/js/app.js'
    ],
    'libCss' : [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css'
        // 'bower_components/bootstrap/dist/css/bootstrap-theme.css'
    ],
    'scss' : [
        'app/scss/app.scss'
    ]
}
// concat libraries' Css
gulp.task('concatLibsCss', function() {
    return gulp.src(inputs.libCss)
        .pipe(concatCss('libs.css'))
        .pipe(gulp.dest('app/css'));
});
// compile sass
gulp.task('compileSass', ['concatLibsCss'], function() {
    return gulp.src(inputs.scss)
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('../srcmaps'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({ stream:true }));
});
// concat libraries
gulp.task('concatLibs', function() {
    gulp.src(inputs.libs)
        .pipe(maps.init())
        .pipe(concat('libs.js'))
        .pipe(maps.write('../srcmaps'))
        .pipe(gulp.dest('app/js'));
});
// watch files
gulp.task('watchFiles', function() {
    gulp.watch(['app/css/libs.css'], ['concatLibsCss']);
    gulp.watch(['app/scss/**/*.scss'], ['compileSass']);
    gulp.watch(['app/js/libs.js'], ['concatLibs']);
    gulp.watch(['app/js/app.js'], ['concatJs']);
});
// serve the files
gulp.task('serve', function() {
    browserSync.init({
        server: './app'
    });
    gulp.watch(['app/css/libs.css'], ['concatLibsCss']).on('change', browserSync.reload);
    gulp.watch(['app/scss/**/*.scss'], ['compileSass']);
    gulp.watch(['app/js/libs.js'], ['concatLibs']).on('change', browserSync.reload);
    gulp.watch(['app/js/app.js']).on('change', browserSync.reload);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

// default task for dev
gulp.task('default', ['serve']);
