const knex = require('knex');

const knexConfig = require('./knexfile.js');  
const logger = require('@src/modules/logger');

const ENV = 'development';  
const _knex = knex(knexConfig[ENV]);
knexConfig[ENV].debug = process.argv[2] === '--debug' ? true : false;

logger.info(`knex config: ${JSON.stringify(knexConfig[ENV])}`);

export default _knex;