/**
 * Copyright Marmoym 2017-2018
 */
import "reflect-metadata";

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import corsHandler from '@middlewares/corsHandler';
import db from '@entities/db';
import errorHandler from './middlewares/errorHandler';
import httpLogger from '@middlewares/httpLogger';
import LaunchStatus from '@constants/LaunchStatus';
import launchStatusChecker from '@middlewares/launchStatusChecker';
import { dbLog, expressLog, stateLog } from '@modules/Log';
import marmoymConfig from '@config/marmoymConfig';
import ResponseType from '@models/ResponseType';
import routeNoMatchHandler from '@middlewares/routeNoMatchHandler';
import routes from '@routes/routes';
import Token from '@modules/Token';

const app: express.Application = express();

const state: State = {
  launchStatus: LaunchStatus.NOT_YET_INTIALIZED,
  update(obj = {}) {
    stateLog.info('state will update with: %o', obj);
    for (let key in this) {
      if (obj[key]) {
        this[key] = obj[key];
      }
    }
  },
};

(function prepareModules() {
  Token.initialize({
    privateKey: marmoymConfig.auth.privateKey,
    tokenDuration: marmoymConfig.auth.tokenDuration,
  });

  db.sequelize.sync()
    .then((res) => {
      dbLog.info('db connect success');
      state.update({
        launchStatus: LaunchStatus.INIT_SUCCESS,
      });
    })
    .catch((err) => {
      dbLog.error(err);
      state.update({
        launchStatus: LaunchStatus.INIT_ERROR,
      });
    });
})();

(function defineApp() {
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  app.use(httpLogger);

  app.use(corsHandler());

  app.use(cookieParser());

  app.use(launchStatusChecker(state));

  routes(app);

  app.use(routeNoMatchHandler);

  app.use(errorHandler);
  
  app.listen(marmoymConfig.app.port, function(err) {
    if (err) {
      console.error(err);
    }
    
    expressLog.info('Listening at port: %s', marmoymConfig.app.port);
    expressLog.info('Server status: %s', state.launchStatus);
  });
})();

export default app;

export interface State {
  launchStatus: string,
  update: ({}) => void,
}
