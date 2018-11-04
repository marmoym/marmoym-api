(function changeCurrentWorkingDirectoryToResolveNodeModulesPath() {
  process.chdir('../../');
  console.info('[gulp] Current working directory %s', process.cwd());
})();

const babel = require('gulp-babel');
const chalk = require('chalk');
const del = require('del');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const util = require('util');

const babelRc = require('../babel/.babelRc');
const paths = require('../../src/paths');

const Task = {
  BABEL: 'babel',
  BUILD: 'build',
  CLEAN: 'clean',
  EMPTYLOG: 'emptylog',
  TSC: 'tsc',
};

const buildLog = (tag, ...args) => {
  console.info(chalk.cyan(`[build - ${tag}]`), util.format(...args));
};

gulp.task(Task.CLEAN, () => {
  buildLog(Task.CLEAN, `Remove all the contents in ${paths.dist}`);

  return del([
    `${paths.dist}/**/*`,
  ]);
});

gulp.task(Task.EMPTYLOG, () => {
  buildLog(Task.EMPTYLOG, `LOG_PATH: ${paths.logs}`);
  
  return del([
    `${paths.logs}/**/*`,
  ]);
});

gulp.task(Task.BABEL, () => {
  buildLog(
    Task.BABEL,
    'babelRc: %o',
    babelRc,
  );

  return gulp.src([`${paths.src}/**/*.{js,jsx,ts,tsx}`])
    .pipe(sourcemaps.init())
    .pipe(babel(babelRc))
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dist));
});

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

gulp.task(Task.TSC, () => {
  buildLog(Task.TSC, `TSC_CONFIG at: %s: `, paths.tsconfig);

  const tsProject = ts.createProject(paths.tsconfig);
  return tsProject.src()
    .pipe(tsProject());
});

gulp.task(Task.BUILD, gulp.series('clean', Task.BABEL));
