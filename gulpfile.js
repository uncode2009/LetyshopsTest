var gulp    = require('gulp'), // Подключаем Gulp
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-clean-css'),
  concat = require('gulp-concat');
var startFolder = 'src/',
finishFolder = 'dist/';

gulp.task('connect', function() {
  connect.server({
    root: finishFolder,
    port:8080,
    livereload: true,
    livereloadPort: 3000,
    middleware:function(connect){
    return[connect().use("/bower_components", connect.static("bower_components"))]; 
   

    }
  });
});

gulp.task('html', ['html-include'], function() {
  gulp.src(startFolder + '**.html')
    .pipe(gulp.dest(finishFolder))
    .pipe(connect.reload());
});
gulp.task('html-include', function() {
  return gulp.src(startFolder + 'modules/**/**/**.html')
    .pipe(gulp.dest(finishFolder + 'views/'));
});
gulp.task('sass', ['bower_styles','images'], function() {
  return gulp.src(startFolder + 'sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(finishFolder + 'css/'))
    .pipe(connect.reload());
});
gulp.task('bower_styles', function() {
  gulp.src(startFolder + 'css/bootstrap.css')
    .pipe(concat('bower_components.css'))
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(finishFolder + 'css/'));
});

 gulp.task('images', function() {
  return gulp.src(startFolder + 'img/**/*')
    .pipe(gulp.dest(finishFolder + 'img/'));
});


gulp.task('js', function() {
  gulp.src([
      startFolder + '**/**/**/**/**.module.js',
      startFolder + '**/**/**/**/**.routing.js',
      startFolder + '**/**/**/**/**.config.js',
      startFolder + '**/**/**/**/**.service.js',
      startFolder + '**/**/**/**/**.controller.js'
    ])
    .pipe(concat('app.js'))
  /*  .pipe(minify())
    .pipe(uglify())*/
    .pipe(gulp.dest(finishFolder + 'js/'))
    .pipe(connect.reload());

  gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angularUtils-pagination/dirPagination.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js'
      ])
    .pipe(concat('bower_components.js'))
 /*   .pipe(minify())
    .pipe(uglify())*/
    .pipe(gulp.dest(finishFolder + 'js'));
});
gulp.task('watch', function() {
  gulp.watch(startFolder + 'modules/**/**/**.html', ['html-include']);
  gulp.watch(startFolder + '**.html', ['html']);
  gulp.watch(startFolder + '**/**/**/**/**.js', ['js']);
  gulp.watch(startFolder + 'sass/**/**.*', ['sass']);
});

gulp.task('build', ['html', 'sass', 'js'], function() {

});
gulp.task('default', ['connect', 'watch', 'build']);


