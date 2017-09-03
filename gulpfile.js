/*
 Created By Hussien Mohamed Farghal
 Copyright (C) 2017 - All Rights Reserved.
 * You can not use or distribute or modify this code with out my permissions. 
 Please contact me first throw this channels 
 E-mail:hussienfarghal@gmail.com
 Facebook.com/hussienfarghal
 mobile:+201207077747
*/
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    order = require("gulp-order"),
    watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var notify = require('gulp-notify');

gulp.task('images', function() {
    gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images/'))
        .pipe(notify('images task finished'))
});

gulp.task('styles', function() {
    gulp.src(['src/scss/*.scss'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer('last 4 versions'))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(notify('styles task finished'))
});

gulp.task('scripts', function() {
    return gulp.src("src/js/*.js")
        .pipe(order([
            "jquery-3.2.1.js",
            "tether.js",
            "bootstrap.js",
            "custom.js"


        ]))
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(notify('js task finished'))
});

gulp.task('html', function() {
    gulp.src(['./*.html'])
        .pipe(plumber({
            handleError: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest('./dist/'))
        .pipe(notify('html task finished'))
});


//dev task un minified
gulp.task('dev', function() {
        gulp.watch('src/scss/*.scss', ['styles']);
        gulp.watch('src/js/*.js', ['scripts']);

    })
    //build task minified
gulp.task('build', ['html', 'styles', 'scripts', 'images']);