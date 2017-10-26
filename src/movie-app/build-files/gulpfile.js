var gulp = require('gulp'),
    pkg = require('./package.json'),
    print = require('gulp-print'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    uglifyJs = require('gulp-uglify'),
    uglifyCss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    beautify = require('gulp-beautify'),
    ngAnnotate = require('gulp-ng-annotate'),
    templates = require('gulp-angular-templatecache'), 
    bower = require('main-bower-files'),
    gulpCopy = require('gulp-copy');


function minifyJs() {
    return uglifyJs();
}

function minifyCss() {
    return uglifyCss();
}


function deployBower(destPath) {
    var bowerComponents = { base: 'bower_components' };

    gulp.src(bower(bowerComponents))
        .pipe(filter('**/*.js'))
        .pipe(print())
        .pipe(beautifyJs())
        .pipe(gulp.dest(destPath + 'js'))
        .pipe(minifyJs())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(destPath + 'js'));

    gulp.src(bower(bowerComponents)
        .concat(['bower_components/bootstrap/dist/css/*']))
        .pipe(filter('**/*.css'))
        .pipe(print())
        .pipe(gulp.dest(destPath + 'css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(destPath + 'css'));

    gulp.src(bower(bowerComponents).concat(['bower_components/bootstrap/fonts/*']))
        .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(gulp.dest(destPath + 'fonts'));
}

function beautifyJs() {
    return beautify({
        jslint_happy: true,
        end_with_newline: true,
        keep_array_indentation: true,
        keep_function_indentation: true,
        indentSize: 2,
        indent_with_tabs: true
    });
}

function deployAngularApp(srcPath, destPath, package) {
    gulp.src(srcPath)
        .pipe(concat(package + '.js'))
        .pipe(ngAnnotate({ single_quotes: true }))
        .pipe(beautifyJs())
        .pipe(gulp.dest(destPath + 'js'))
        .pipe(minifyJs())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(destPath + 'js'));
}


function deployAngularAppTemplates(srcPath, destPath, package) {
    gulp.src(srcPath)
        .pipe(templates({
            module: package + '.templates',
            standalone: true,
            transformUrl: function (url) {
                return url.replace(/\.tpl\.html$/, '.html');
            }
        }))
        .pipe(beautifyJs())
        .pipe(gulp.dest(destPath + 'js'))
        .pipe(uglifyJs())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(destPath + 'js'));
}

function deployCss(srcPath, destPath) {
    gulp.src(srcPath)
        .pipe(gulp.dest(destPath + 'css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(destPath + 'css'));
}


function copyFiles(sourcePath, destinationPath) {
    return gulp.src(sourcePath)
        .pipe(print())
        .pipe(gulp.dest(destinationPath));
}

gulp.task('deploy-bower', () => {
    deployBower('../server/public/libs/');
});


gulp.task('default', () => {
    var imageFolderPath = '../client/assets/img';
    //build ui
    deployAngularApp(['../client/**/*.js'], '../server/public/', 'my-movie');
    deployAngularAppTemplates(['../client/**/*.tpl.html'], '../server/public/', 'my-movie');
    deployCss(['../client/assets/css/*.css'], '../server/public/');
    copyFiles([imageFolderPath + '/*.jpg', imageFolderPath + '/*.gif', imageFolderPath + '/*.svg', imageFolderPath + '/*.png', imageFolderPath + '/*.ico'], '../server/public/images/');
    copyFiles(['../client/*.html'], '../server/public/')
});