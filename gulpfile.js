// the gulp config
var gulp    = require('gulp'),
    changed = require('gulp-changed'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    maps    = require('gulp-sourcemaps'),
    del     = require('del'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
