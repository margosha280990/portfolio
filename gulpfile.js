const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
//const del = require('del');
//const jslint = require('gulp-jslint');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*pug',
        src: 'src/templates/**/*pug',
        dest: 'build/assets'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    },
    fonts: {
        src: 'src/styles/fonts/**/*.*',
        dest: 'build/assets/fonts/'
    },

}

//pug
function templates() {
    return gulp.src(paths.templates.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}

//scss
function styles() {
    return gulp.src('./src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
}

//del
//function del() {
  //  return del(paths.root)
//}

//watch
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.fonts.src, fonts);
}

//server
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//images perenos
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}
//shrift perenos
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}


function scripts() {
    return gulp.src('src/scripts/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}


exports.templates = templates;
exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
//exports.del = del;
//exports.watch = watch;

gulp.task('default', gulp.series(
    gulp.parallel(styles, templates, images, scripts, fonts),
    gulp.parallel(watch, server)
));

/*gulp.task('default', function () {
    return gulp.src('src/scripts/**//**.js')
            .pipe(jslint())
            .pipe(jslint.reporter('default', errorsOnly))
            .pipe(jslint.reporter('stylish', options));
});*/