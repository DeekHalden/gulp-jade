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
    return gulp.src('src/**/index.jade')
        .pipe(jade())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist/'))
        
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

gulp.task('images', () => {
    return gulp.src('./src/**/*.png')
        
        
        .pipe(gulp.dest('dist'))
        
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
gulp.task('default', ['images', 'browserSync'], function() {
    
    gulp.watch('src/**/*.scss', ['styles-watch']);
    gulp.watch('src/**/*.jade', ['jade-watch']);

});
