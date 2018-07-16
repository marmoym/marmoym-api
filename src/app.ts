/**
 * Copyright Marmoym 2017
 */
import "reflect-metadata";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import corsHandler from '@middlewares/corsHandler';
import Database from '@modules/Database';
import errorHandler from './middlewares/errorHandler';
import Logger from '@modules/Logger';
import marmoymConfig from '@config/marmoymConfig';
import ResponseType from '@models/ResponseType';
import routeNoMatchHandler from '@middlewares/routeNoMatchHandler';
import routes from '@routes/routes';
import Token from '@modules/Token';

const APP_LAUNCH_STATUS = {
  NOT_YET_INTIALIZED: 'NOT_YET_INTIALIZED',
  INIT_ERROR: 'INIT_ERROR',
  INIT_SUCCESS: 'INIT_SUCCESS',
};

const app: express.Application = express();

const state = {
  appLaunchStatus: APP_LAUNCH_STATUS.NOT_YET_INTIALIZED,
  dirname: __dirname,
};

(function prepareModules() {
  Token.initialize({
    privateKey: marmoymConfig.auth.privateKey,
    tokenDuration: marmoymConfig.auth.tokenDuration,
  });

  Database.initialize()
    .then((connections) => {
      state.appLaunchStatus = APP_LAUNCH_STATUS.INIT_SUCCESS;
    })
    .catch((err) => {
      state.appLaunchStatus = APP_LAUNCH_STATUS.INIT_ERROR;
    });
})();

(function defineApp() {
  app.use(morgan('tiny'))
  app.use(corsHandler());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    if (state.appLaunchStatus === APP_LAUNCH_STATUS.NOT_YET_INTIALIZED) {
      res.send({
        message: 'App is launching. Reload after 15 seconds.',
      });
    } else if (state.appLaunchStatus === APP_LAUNCH_STATUS.INIT_ERROR) {
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
    Logger.info('Listening at port: %s', marmoymConfig.app.port);
  });
})();

export default app;
