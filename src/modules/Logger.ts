import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as winston from 'winston';
require('winston-daily-rotate-file');

import { PROD_ENV } from '@utils/envUtils';

const LOG_PATH = path.resolve(__dirname, '../../../logs');
if (!fs.existsSync(LOG_PATH)){
  fs.mkdirSync(LOG_PATH);
}

/**
 * Log format
 * @see https://github.com/winstonjs/logform
 */
const splat = winston.format(function (info) {
  if (info.splat) {
    info.message = util.format(info.message, ...info.splat);
  }
  delete info.splat;
  return info;
});

const consoleLogger = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf((info) =>`${info.timestamp} ${info.level}: ${info.message}`),
  ),
  level: 'debug',
});

const dailyRotateFileLogger = new winston.transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  dirname: LOG_PATH,
  filename: 'app-%DATE%.log',
  format: winston.format.combine(
    winston.format.timestamp(),
    splat(),
    winston.format.json(),
  ),
  level: 'info',
  prepend: false,
});

const Logger = winston.createLogger({
  transports: [
    ...(!PROD_ENV ? [consoleLogger] : []),
    dailyRotateFileLogger,
  ],
});

export default Logger;
