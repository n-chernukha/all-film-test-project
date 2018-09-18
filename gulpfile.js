
// Add our dependencies
var gulp = require('gulp'), // Main Gulp module
    concat = require('gulp-concat'), // Gulp File concatenation plugin
    open = require('gulp-open'), // Gulp browser opening plugin
    connect = require('gulp-connect'), // Gulp Web server runner plugin
    path = require('path'),
    less = require('gulp-less'); //Gulp Less plugin

// Configuration
var configuration = {
    paths: {
        src: {
            html: './src/*.html',
            less: [
                './src/less/*.less'
            ],
            img: './src/images/**'
        },
        dist: './dist'
    },
    localServer: {
        port: 8001,
        url: 'http://localhost:8001/'
    }
};

// Gulp task to copy HTML files to output directory
gulp.task('html', function() {
    gulp.src(configuration.paths.src.html)
        .pipe(gulp.dest(configuration.paths.dist))
        .pipe(connect.reload());
});

gulp.task('less', function () {
    return gulp.src(configuration.paths.src.less)
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(connect.reload());
  });

gulp.task('copy:img', () => gulp.src(configuration.paths.src.img)
  .pipe(gulp.dest(configuration.paths.dist + '/images')));

// Gulp task to create a web server
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: configuration.localServer.port,
        livereload: true
    });
});

// Gulp task to open the default web browser
gulp.task('open', function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: configuration.localServer.url}));
});

// Watch the file system and reload the website automatically
gulp.task('watch', function () {
    gulp.watch(configuration.paths.src.html, ['html']);
    gulp.watch(configuration.paths.src.less, ['less']);
});

// Gulp default task
gulp.task('default', ['html', 'less', 'copy:img', 'connect', 'open', 'watch']);
