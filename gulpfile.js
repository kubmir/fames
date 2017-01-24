var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('gulp-webpack');

// Builds server-side of Fames.
gulp.task('server', function() {

    // It is necessary to load project file instead of defining configuration through the sourcemaps.write() in order to let
    // gulp-sourcemaps generate sourceRoot and enable server debug (probably bug in gulp-sourcemaps).
    var typescriptServerProject = typescript.createProject("tsconfig.server.json");

    // Source maps points to ./src folder. VS Code is able to debug server-side code thanks to settings in launch.json.
    return typescriptServerProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(typescriptServerProject())
        .js
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../src'
        }))
        .pipe(gulp.dest('bin'))
});

// Packs client side code to one file.
gulp.task('webpack', function() {
    return gulp.src('./src/client/index.tsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('.'));
});

// Prepares both server-side and client-side parts of Fames.
gulp.task('default', ['server', 'webpack']);