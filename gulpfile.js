const gulp = require('gulp');
const rev = require('gulp-rev');

gulp.task('default', ['all-rev']);

gulp.task(
  'all-rev',
  () =>
    gulp
      .src('assets/**/*') // gulp.src('assets/**/*', {base: './'})
      .pipe(gulp.dest('public')) // write files as is to public
      .pipe(rev()) // rev the files
      .pipe(gulp.dest('public')) // write rev-ed files to public
      .pipe(
        rev.manifest({
          // generate the manifest
          base: 'public'
        })
      )
      .pipe(gulp.dest('public')) //  write it to public
);
