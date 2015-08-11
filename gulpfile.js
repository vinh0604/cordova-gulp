var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var del = require('del');
var cordova = require('cordova-lib').cordova.raw;

var env = process.env.NODE_ENV || 'development';

function compile (watch) {
    var bundler = watchify(browserify('./www_src/javascripts/index.js', { debug: true }).transform(babel));

    function rebundle () {
        var bundle = bundler.bundle()
            .on('error', function (err) {
                console.error(err); this.emit('end');
            })
            .pipe(source('build.js'))
            .pipe(buffer())

        if (env == 'production') {
            bundle = bundle.pipe(uglify())
        } else {
            bundle = bundle
                        .pipe(sourcemaps.init({ loadMaps: true }))
                        .pipe(sourcemaps.write('./'))
        }

        bundle.pipe(gulp.dest('./www/js'));
    }

    if (watch) {
        bundler.on('update', function () {
            console.log('-> bundling...');
            rebundle();
            console.log('-> bundle complete.');
        });
    }

    rebundle();
}

function watch() {
    compile(true);
}

gulp.task('copy-assets', function () {
    gulp.src('www_src/img/**/*')
        .pipe(gulp.dest('./www/img'))

    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./www/fonts'))

    gulp.src('www_src/index.html')
        .pipe(gulp.dest('./www'))

    gulp.src('www_src/templates/*.html')
        .pipe(gulp.dest('./www/templates'))
});

gulp.task('watch-assets', function () {
    gulp.watch(['www_src/templates/*.html', 'www_src/index.html', 'www_src/img/**/*'], ['copy-assets']);
});

gulp.task('sass', function () {
    gulp.src('www_src/stylesheets/index.scss')
        .pipe(sass({ sourceComments: 'map' }))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('watch-sass', function () {
    gulp.watch('www_src/stylesheets/**/*.scss', ['sass']);
});

gulp.task('watch', function () {
    watch();
});

gulp.task('compile', function () {
    compile();
});

gulp.task('clean', function (cb) {
    return del(['./www'], cb);
});

gulp.task('default', ['sass', 'watch-sass', 'watch', 'copy-assets', 'watch-assets']);
gulp.task('build', ['clean'], function () {
    gulp.start('sass', 'compile', 'copy-assets');
    return gulp.src('./')
               .pipe(shell('cordova build'))
});
