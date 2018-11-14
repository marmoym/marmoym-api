import * as NodeLogger from '@nodekit/node-logger';

import chalk from 'chalk';
import * as paths from '@src/paths';

const nodeLogger = NodeLogger.createLogger({
  logPath: paths.logs,
});

export default nodeLogger;

export const gulpLog = nodeLogger.with({
  colorFunction: chalk.gray,
  tag: 'gulp',
});

export const httpLog = nodeLogger.with({
  colorFunction: chalk.black,
  tag: 'http',
});

export const launchLog = nodeLogger.with({
  colorFunction: chalk.gray,
  tag: 'launch',
});

export const dbLog = nodeLogger.with({
  colorFunction: chalk.magentaBright,
  tag: 'db',
});

export const stateLog = nodeLogger.with({
  colorFunction: chalk.yellowBright,
  tag: 'server-state',
});

export const expressLog = nodeLogger.with({
  colorFunction: chalk.blue,
  tag: 'express',
});
