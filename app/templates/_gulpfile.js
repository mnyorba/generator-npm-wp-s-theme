'use strict';

var gulp         = require('gulp');
var zip          = require('gulp-zip');

var js_files     = ['js/*.js', '!js/*.min.js', '!js/lib/**/*.js'];
var build_files = [
  '**',
  '!node_modules',
  '!node_modules/**',
  '!bower_components',
  '!bower_components/**',
  '!dist',
  '!dist/**',
  '!sass',
  '!sass/**',
  '!.git',
  '!.git/**',
  '!package.json',
  '!bower.json',
  '!**/*.arj',
  '!**/*.rar',
  '!**/*.zip',
  '!.gitignore',
  '!gulpfile.js',
  '!.editorconfig',
  '!.jshintrc'
];

gulp.task('build-copy', function() {
  return gulp.src(build_files)
    .pipe(gulp.dest('dist/<%= package_name %>'));
});

gulp.task('build-zip', function() {
  return gulp.src('dist/**/*')
    .pipe(zip('<%= package_name %>.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-delete', function() {
  del(['dist/**/*', '!dist/<%= package_name %>.zip']);
});
