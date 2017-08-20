/**
 * Copyright Marmoym 2017
 *
 */

import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import config from '../../config';


/**
 * Models of database.
 */
const models: any = {};

/**
 * ...
 */
function _init() {
  models['sequelize'] = _connectToDB();
  models['Sequelize'] = Sequelize;

  // Mutates 'models'
  _bootstrapModels();

  // return models['sequelize'].sync()
}

/**
 * ...
 */
function _bootstrapModels() {
  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
      let model = models.sequelize.import(path.join(__dirname, file));
      models[model['name']] = model;
    });

  Object.keys(models).forEach(function (modelName) {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });
}

/**
 * Connects to DB via Sequelize
 */
function _connectToDB() {
  return new Sequelize(
    config.db.DATABASE,
    config.db.USERNAME,
    config.db.PASSWORD,
    {
      host: config.db.HOST,
      port: config.db.PORT,
      dialect: config.db.DIALECT,
      timezone: config.db.TIMEZONE
    }
  );
}

/**
 * ...
 */
_init();

export default models;
