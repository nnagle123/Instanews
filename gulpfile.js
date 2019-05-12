const gulp =require("gulp");
const terser = require("gulp-terser"),
rename = require("gulp-rename"),
browserSync = require('browser-sync').create(),
eslint = require("gulp-eslint"),
sass = require("gulp-sass"),
cssnano = require("gulp-cssnano"),
autoprefixer = require("gulp-autoprefixer");

gulp.task("eslint", function(){
    return gulp
    .src("./js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
    });

gulp.task('sass', function(){
    return gulp
    .src('./css/style.scss')
    .pipe(sass())
    .pipe(
        autoprefixer({
            browsers: ['last 2 versions'],
        })
    )
.pipe(gulp.dest('./build/css'))
.pipe(cssnano())
.pipe(rename("style.min.css"))
.pipe(gulp.dest('./build/css'))
.pipe(browserSync.stream());
})


gulp.task("scripts", function(){
return gulp
.src("./js/*.js")
.pipe(terser())
.pipe(rename({ extname: ".min.js" }))
.pipe(gulp.dest("./build/js"))
.pipe(browserSync.stream());
});

gulp.task("watch", function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("js/*.js", gulp.series("scripts", "eslint"));
    gulp.watch("./css/*.scss", gulp.series("sass"));
    gulp.watch("./*.html").on('change', browserSync.reload);
    
});

gulp.task("default", gulp.parallel("watch"));