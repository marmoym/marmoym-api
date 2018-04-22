const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');

const DIST_PATH = path.resolve(__dirname, '../../dist');
const LOG_PATH = path.resolve(__dirname, '../../logs');
const ROOT_PATH = path.resolve(__dirname, '../../');
const TEST_PATH = path.resolve(__dirname, '../../dist/__test__');
const TSCONFIG_PATH = path.resolve(__dirname, '../../tsconfig.json');
const TSC_OUT_PATH = path.resolve(__dirname, '../../tsc_out');

/**
 * Ensure that the current working directory is project root. This allows taking
 * `node_modules` path as expected.
 */
process.chdir('../../');
console.log('Current working directory %s', process.cwd());

gulp.task('clean', () => {
  console.log('Remove all the contents in %s', DIST_PATH);

  return del([
    `${DIST_PATH}/**/*`,
  ]);
});

gulp.task('emptylog', () => {
  console.log('LOG_PATH: %s', LOG_PATH);
  
  return del([
    `${LOG_PATH}/**/*`,
  ]);
});

gulp.task('tsc-babel', () => {
  console.log('DIST_PATH: %s, TSCONFIG_PATH: %s', DIST_PATH, TSCONFIG_PATH);

  const tsProject = ts.createProject(TSCONFIG_PATH);

  return tsProject.src()
    .pipe(tsProject())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task('build', gulp.series('clean', 'tsc-babel'));

// gulp.task('test', gulp.series('build', (done) => {
//   return gulp.src([`${TEST_PATH}/**/*.spec.js`], { read: false })
//     .pipe(mocha({
//       exit: true,
//     }))
//     .once('error', err => {
// 			console.error(err);
//       process.exit(1);
//       done();
// 		});
// }));

gulp.task('tsc', () => {
  console.log('TSC_OUT_PATH: %s', TSC_OUT_PATH);

  const tsProject = ts.createProject(TSCONFIG_PATH);

  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest(TSC_OUT_PATH));
});

