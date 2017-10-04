const knex = require('knex');
const winston = require('winston');

const config = require('./knexfile.js');  
const env = 'development';  
const _knex = knex(config[env]);

winston.level = 'debug';

const result = _knex.migrate.rollback().then(res => {
  winston.log('debug', 'ROLLBACK COMPLETE');
  winston.log('debug', 'RESULT', res);
});