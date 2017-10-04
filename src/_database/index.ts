/**
 * Copyright Marmoym 2017
 */
import * as fs from 'fs';
import * as path from 'path';


// import config from '../config';

// const DB_PATH = __dirname;

// const _bootstrapModels = (models) => {
//   fs
//     .readdirSync(DB_PATH)
//     .filter(function (file) {
//       return (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js');
//     })
//     .forEach(function (file) {
//       let model = models.sequelize.import(path.join(DB_PATH, file));
//       models[model['name']] = model;
//     });

//   Object.keys(models).forEach(function (modelName) {
//     if ("associate" in models[modelName]) {
//       models[modelName].associate(models);
//     }
//   });

//   return models;
// }

// const _connect = (serverName) => {
//   return new Sequelize(
//     config.db[serverName]['database'],
//     config.db[serverName]['username'],
//     config.db[serverName]['password'],
//     {
//       host: config.db[serverName]['host'],
//       port: config.db[serverName]['port'],
//       dialect: config.db[serverName]['dialect'],
//       timezone: config.db[serverName]['timezone']
//     }
//   );
// };

// const _instantiateDB = (serverName) => {
//   let models = {};
//   models['sequelize'] = _connect(serverName);
//   models['Sequelize'] = Sequelize;
//   models = _bootstrapModels(models);
//   return models;
// }

// /**
//  * The logic does not seem to be scalable at the very end, but we just do it for now.
//  * Examplary additions are provided in the comment below.
//  */
// const init = () => {
//   return Promise.all([
//     db1['sequelize'].sync()
//     // ,db2['sequelize'].sync() for future additions.
//   ]);
// };

// export const db1: any = _instantiateDB('marmoym_dev1');

// export default {
//   init
// }