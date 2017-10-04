const knex = require('knex');
const winston = require('winston');

const config = require('./knexfile.js');  
const ENV = 'development';  
const _knex = knex(config[ENV]);

winston.level = 'debug';

_knex.migrate.latest().then(res => {
  winston.log('debug', 'MIGRATION COMPLETE');
  winston.log('debug', 'RESULT', res);
})

module.exports = knex;