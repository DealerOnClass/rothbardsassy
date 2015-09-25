//  00__Plugins
//
var gulp       = require('gulp'),
    autoprefix = require('gulp-autoprefixer'),
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-image-optimization'),
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
    img__src     = 'app/img',
    img__build   = 'img',
    sass__src    = 'app/sass/**/*.scss',
    sass__build  = 'build/css',
    server__path = '.';

//  01__Scripts
//
gulp.task('scripts', function() {
    gulp.src([
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

//  04__Img
//
gulp.task('imagemin', function(cb) {
    gulp.src([img__src + '*', img__src + '/*.jpg'])
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(img__build)).on('end', cb).on('error', cb);
});

//  05__Inline
//
gulp.task('inline', ['scripts', 'styles', 'html', 'imagemin'], function() {
    gulp.src(html__build + '/index.html')
        .pipe(inline())
        .pipe(gulp.dest(server__path));
});
gulp.task('inline-js', ['scripts', 'html'], function() {
    gulp.src(html__build + '/index.html')
        .pipe(inline())
        .pipe(gulp.dest(server__path));
});
gulp.task('inline-sass', ['styles', 'html'], function() {
    gulp.src(html__build + '/index.html')
        .pipe(inline())
        .pipe(gulp.dest(server__path));
});
gulp.task('inline-html', ['html'], function() {
    gulp.src(html__build + '/index.html')
        .pipe(inline())
        .pipe(gulp.dest(server__path));
});

//  06__Serve
//
gulp.task('serve', ['inline'], function() {
    sync.init({ server: server__path });    // declare server
    gulp.watch(js__src,   ['inline-js']);   // on js change
    gulp.watch(sass__src, ['inline-sass']); // on sass change
    gulp.watch(html__src, ['inline-html']); // on html change
});

//  Default
//
gulp.task('default', ['serve']);        // run
