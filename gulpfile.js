var gulp = require('gulp');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var bs = require("browser-sync").create();
var rename = require("gulp-rename");
/**
 * Compile jade files into HTML
 */
gulp.task('templates', function() {
    return gulp.src('./src/**/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))
        
});


gulp.task('styles', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

/**
 * Important!!
 * Separate task for the reaction to `.jade` files
 */
gulp.task('jade-watch', ['templates'], reload);
gulp.task('styles-watch', ['styles'], reload);


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

/**
 * Serve and watch the jade files for changes
 */
gulp.task('default', ['browserSync'], function() {
    
    gulp.watch('src/**/*.scss', ['styles-watch']);
    gulp.watch('src/**/index.jade', ['jade-watch']);

});
