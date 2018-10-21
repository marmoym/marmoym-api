/**
 * Copyright Marmoym 2017-2018
 */
import "reflect-metadata";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import corsHandler from '@middlewares/corsHandler';
import db from '@entities/db';
import errorHandler from './middlewares/errorHandler';
import httpLogger from '@middlewares/httpLogger';
import LaunchStatus from '@constants/LaunchStatus';
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

  app.use((req, res, next) => {
    if (state.launchStatus === LaunchStatus.NOT_YET_INTIALIZED) {
      res.send({
        message: 'App is launching. Reload after a few seconds.',
      });
    } else if (state.launchStatus === LaunchStatus.INIT_ERROR) {
      res.status(500)
        .send({
          code: ResponseType.INITIALIZATION_ERROR.code,
          message: ResponseType.INITIALIZATION_ERROR.desc,
        });
    } else {
      next();
    }
  });
  routes(app);
  app.use(routeNoMatchHandler);
  app.use(errorHandler);
  
  app.listen(marmoymConfig.app.port, function(err) {
    if (err) {
      return console.error(err);
    }
    expressLog.info('Listening at port: %s', marmoymConfig.app.port);
    expressLog.info('Server status: %s', state.launchStatus);
  });
})();

export default app;

interface State {
  launchStatus: string,
  update: ({}) => void,
}
