// gulpfile.js
var  gulp = require('gulp'),
	 concat = require('gulp-concat'),
	 clean = require('gulp-rimraf'),
	 cssmin = require("gulp-minify-css"),
	 jsValidate = require('gulp-jsvalidate'),
	 notify = require('gulp-notify'),
	 uglify = require('gulp-uglify'),
	 jasmine = require('gulp-jasmine'),
   browserSync = require('browser-sync'),
	 sass = require('gulp-sass'),
	 autoprefixer = require('gulp-autoprefixer'),
	 sourcemaps = require('gulp-sourcemaps'),
	 handlebars = require('gulp-compile-handlebars'),
	 rename = require('gulp-rename'),
   postcss = require('gulp-postcss'),
   nested = require('postcss-nested'),
   syntax = require('postcss-scss');


gulp.task('clean', [], function() {
  return gulp.src("build/*", { read: false }).pipe(clean());
});


// Generate Images
gulp.task('generate_images', ['clean'], function() {
    return gulp.src('contents/images/**/*')
        .pipe(gulp.dest('build/styles/images/'));
});

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  })
})

gulp.task('build-css', ['clean'], function() {

  	return gulp.src('contents/styles/**/*.scss')
  	
  	  .pipe(sourcemaps.init())

  	  // .pipe(sass({
     //    includePaths: require('node-normalize-scss').includePaths
     //  }).on('error', sass.logError))

      .pipe(sass().on('error', sass.logError))
      // .pipe(urlencode())
      .pipe(autoprefixer({

       browsers: ['last 10 version'],
       cascade: false

      }))
        
  	  //.pipe(concat('main.min.css'))

      //.pipe(postcss())

      //.pipe(cssmin())

	    .pipe(sourcemaps.write('./maps'))

      .pipe(gulp.dest('build/styles/'))

      .pipe(browserSync.reload({ // Reloading with Browser Sync
        stream: true
      }));
});

gulp.task('javascript', ['clean'], function () {
  return gulp.src("contents/javascripts/**.js")
      .pipe(jsValidate())
      .on("error", notify.onError(function(error) {
        return error.message;
      }))

      //.pipe(uglify())

      .pipe(concat('main.js'))

      .pipe(gulp.dest('build/javascripts'))

      .pipe(browserSync.reload({ // Reloading with Browser Sync
        stream: true
      }));
});

gulp.task('default', ['generate_images', 'build-css', 'html', 'javascript']);



gulp.task('html', () => {

	return gulp.src('contents/pages/*.hbs')

		.pipe(handlebars({}, {
			ignorePartials: true,
			batch: ['contents/partials']
		}))

		.pipe(rename({
			extname: '.html'
		}))

		.pipe(gulp.dest('build/'))

    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

gulp.task('watch', ['default'], function() {
  return gulp.watch(['contents/**'], ['default']);
});


// gulp.task('webserver', function() {
//   return gulp.src('build')
//     //.pipe(webserver({ livereload: true }))
//     .pipe(webserver());
// });