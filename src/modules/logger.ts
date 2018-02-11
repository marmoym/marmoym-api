import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';
require('winston-daily-rotate-file'); // necesssary to insert into winston transports.

const LOG_PATH = path.resolve(__dirname, '..', '..', 'log');
const tsFormat = () => (new Date()).toLocaleTimeString();
const LOG_LEVEL = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

// Create the directory if it does not exist
if (!fs.existsSync(LOG_PATH)) {
  winston.warn(`Creating log path at ${LOG_PATH}`);
  fs.mkdirSync(LOG_PATH);
}

const _transports = [
  new (winston.transports.Console)({
    timestamp: tsFormat,
    colorize: true,
    level: LOG_LEVEL,
  }),
];

const dailyRotateLogger = new (winston.transports.DailyRotateFile)({
  filename: `${LOG_PATH}/log`,
  timestamp: tsFormat,
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: LOG_LEVEL,
});

if (process.env.NODE_ENV === 'production') {
  _transports.push(dailyRotateLogger);
}

const logger = new (winston.Logger)({
  transports: _transports,
});

logger.warn('[BEGIN] ================== winston.js logger check ==================');
logger.warn(`winston is set with ${logger._names.length} loggers`)
logger.debug('winston debug');
logger.verbose('winston verbose');
logger.info('winston info');
logger.warn('winston warn');
logger.error('winston error');
logger.warn('[  END] ================== winston.js logger check ==================');

export default logger;
