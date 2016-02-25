var gulp = require('gulp'),
	concat = require("gulp-concat"),
	clean = require("gulp-clean"),
	uglify = require("gulp-uglify"),
	rename = require('gulp-rename');


// 清除giraffe.js
gulp.task("cleand", function(){
  return gulp.src(['../giraffe.js', '../giraffe.min.js'], {read: false}).pipe(clean({force:true}));
});

// 合并
gulp.task("build", ["cleand"], function() {
	return gulp.src([
		'../src/socket.io.js',
		'../src/giraffe.js'
		])
		.pipe(concat("giraffe.js"))
		.pipe(gulp.dest("../"));
});

// 压缩
gulp.task("default", ["build"], function() {
	return gulp.src("../giraffe.js")
		.pipe(uglify({
			mangle: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest("../"));
});

