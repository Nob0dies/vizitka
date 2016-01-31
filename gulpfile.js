var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass');

gulp.task('jade', function() {
    gulp.src('app/jade/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./app/'));
});


//компилятор sass файлов
gulp.task('sass', function () {
    gulp.src('app/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});

gulp.task("server",function(){
    browserSync({
        port:9000,
        server:{
            baseDir:"app"
        }
    });

    });
gulp.task('watch', function () {
    gulp.watch('app/jade/**/*', ['jade']);
    gulp.watch('app/sass/**/*', ['sass']);
    gulp.watch([
        'app/index.html',
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css'
    ]).on('change', browserSync.reload);
});


gulp.task('default', ['server', 'watch']);