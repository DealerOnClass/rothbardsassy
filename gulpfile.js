//  00__Plugins
//
var gulp       = require('gulp'),
    autoprefix = require('gulp-autoprefixer'),
    concat     = require('gulp-concat'),
    inline     = require('gulp-inline-source'),
    minify     = require('gulp-minify-html'),
    sass       = require('gulp-sass'),
    uglify     = require('gulp-uglify'),
    sync       = require('browser-sync'),
    reload     = sync.reload;

//  00__Paths
//
var js__src      = 'app/js/*.js',
    js__build    = 'build/js',
    html__src    = 'app/*.html',
    html__build  = 'build',
    sass__src    = 'app/sass/**/*.scss',
    sass__build  = 'build/css',
    server__path = '.';

//  01__Scripts
//
gulp.task('scripts', function() {
    return gulp.src([
        'app/js/jquery.js',
        'app/js/tether.min.js',
        'app/js/bootstrap.js',
        'app/js/jquery.easing.min.js',
        'app/js/functions.js'
    ])
        .pipe(concat('scripts.js'))      // concat
        .pipe(uglify())                  // uglify
        .pipe(gulp.dest(js__build))      // output
        .pipe(reload({ stream: true })); // reload server
});

//  02__Styles
//
gulp.task('styles', function() {
    gulp.src(sass__src)
        .pipe(sass())                    // compile scss
        .pipe(autoprefix())              // autoprefix
        .pipe(gulp.dest(sass__build))    // output
        .pipe(reload({ stream: true })); // reload server
});

//  03__Html
//
gulp.task('html', function() {
    gulp.src(html__src)
        .pipe(minify())                  // minify html
        .pipe(gulp.dest(html__build))    // output
        .pipe(reload({ stream: true })); // reload server
});

//  04__Inline
//
gulp.task('inline', ['scripts', 'styles', 'html'], function() {
    gulp.src(html__build + '/index.html')
        .pipe(inline())
        .pipe(gulp.dest(server__path));
});


//  05__Serve
//
gulp.task('serve', ['inline'], function() {
    sync.init({ server: server__path }); // declare server
    gulp.watch(js__src,   ['inline']);   // on js change
    gulp.watch(sass__src, ['inline']);   // on sass change
    gulp.watch(html__src, ['inline']);   // on html change
});

//  Default
//
gulp.task('default', ['serve']);        // run
