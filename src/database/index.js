const knex = require('knex');

const config = require('./knexfile.js');  
const ENV = 'development';  
const _knex = knex(config[ENV]);

export default _knex;