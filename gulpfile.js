let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    del = require('del');

gulp.task('sass', function(){
    return  gulp.src('app/scss/style.scss')
                .pipe(sass({outputStyle: 'compressed'}))
                .pipe(autoprefixer({overrideBrowserslist: ['last 8 versions']}))
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest('app/css'))
                .pipe(browserSync.reload({stream: true}))
});
gulp.task('style', function(){
    return gulp.src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
      'node_modules/textillate/assets/animate.css'
    ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
});
gulp.task('script', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/jquery.formstyler/jquery.formstyler.js',
    'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
    'node_modules/textillate/assets/jquery.lettering.js',
    'node_modules/textillate/jquery.textillate.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
});
gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('js', function(){
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
       proxy: 'pineapple'
    });
});

gulp.task('clean', async function(){
    del.sync('dist')
});

gulp.task('export', function () {
    let buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
    let buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'))
    let buildJs = gulp.src('app/js/**/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('sass', 'style', 'script', 'watch', 'browser-sync'))