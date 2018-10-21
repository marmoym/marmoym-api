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
const DIST_PATH = path.resolve(__dirname, '../../dist');
const LOG_PATH = path.resolve(__dirname, '../../logs');
const ROOT_PATH = path.resolve(__dirname, '../../');
const TEST_PATH = path.resolve(__dirname, '../../dist/__test__');
const TSCONFIG_PATH = path.resolve(__dirname, '../../tsconfig.json');
const TSC_OUT_PATH = path.resolve(__dirname, '../../tsc_out');

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
  buildLog(Task.CLEAN, `Remove all the contents in ${DIST_PATH}`);

  return del([
    `${DIST_PATH}/**/*`,
  ]);
});

gulp.task(Task.EMPTYLOG, () => {
  buildLog(Task.EMPTYLOG, `LOG_PATH: ${LOG_PATH}`);
  
  return del([
    `${LOG_PATH}/**/*`,
  ]);
});

gulp.task(Task.BABEL, () => {
  buildLog(
    Task.BABEL,
    'babelRc: %o',
    babelRc,
  );

  return gulp.src([`${paths.src}/**/*.{js,jsx,ts,tsx}`])
  // return gulp.src([`${paths.src}/t.ts`])
    .pipe(sourcemaps.init())
    .pipe(babel(babelRc))
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dist));

  // const tsProject = ts.createProject(TSCONFIG_PATH);

  // return tsProject.src()
  //   .pipe(tsProject())
  //   .on('error', (err) => {
  //     console.error('[tsc-babel] tsc fails at %s, Process will quit.', err.fullFilename);
  //     process.exit();
  //   })
  //   .pipe(sourcemaps.init())
  //   .pipe(babel())
  //   .pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest(DIST_PATH))
});

gulp.task(Task.BUILD, gulp.series('clean', Task.BABEL));

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
  buildLog(Task.TSC, `TSC_OUT_PATH: ${TSC_OUT_PATH}`);

  const tsProject = ts.createProject(TSCONFIG_PATH);
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest(TSC_OUT_PATH));
});
