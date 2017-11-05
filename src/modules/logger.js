const winston = require('winston');
const fs = require('fs');
const path = require('path');
require('winston-daily-rotate-file'); // necesssary to insert into winston transports.

const LOG_PATH = path.resolve(__dirname, '..', '..', 'log');
const tsFormat = () => (new Date()).toLocaleTimeString();
const LOG_LEVEL = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

if (!fs.existsSync(LOG_PATH)) {
  winston.warn(`Create log directory ${LOG_PATH}`);
  // Create the directory if it does not exist
  fs.mkdirSync(LOG_PATH);
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: LOG_LEVEL,
    }),
    new (winston.transports.DailyRotateFile)({
      filename: `${LOG_PATH}/log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      level: LOG_LEVEL,
    }),
  ],
});

logger.warn('[BEGIN] ================== winston.js logger check ==================');
logger.debug('winston debug');
logger.verbose('winston verbose');
logger.info('winston info');
logger.warn('winston warn');
logger.error('winston error');
logger.warn('[  END] ================== winston.js logger check ==================');

module.exports = logger;
