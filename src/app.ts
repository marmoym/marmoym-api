/**
 * Copyright Marmoym 2017-2018
 */
import "reflect-metadata";

import * as express from 'express';

import { initializeDB } from '@entities/db';
import LaunchStatus from '@constants/LaunchStatus';
import { expressLog } from '@modules/Log';
import marmoymConfig from '@config/marmoymConfig';
import state from '@src/state';
import Token from '@externalModules/token/Token';

import attach from '@externalModules/middleware-attach';
import middlewares from './app.middlewares';

expressLog.info('App is running in NODE_ENV: %s, LOCAL: %s', process.env.NODE_ENV, process.env.LOCAL);

const app: express.Application = express['default']();

(async function prepareModules() {
  Token.initialize({
    privateKey: marmoymConfig.auth.privateKey,
    tokenDuration: marmoymConfig.auth.tokenDuration,
  });

  const dbIsInitialized = await initializeDB();
  state.update({
    launchStatus: dbIsInitialized ? LaunchStatus.INIT_SUCCESS : LaunchStatus.INIT_ERROR,
  });
})();

(function defineApp() {
  attach(app, middlewares);
  
  app.listen(marmoymConfig.app.port, function(err) {
    if (err) {
      console.error(err);
    }
    
    expressLog.info('Listening at port: %s', marmoymConfig.app.port);
    expressLog.info('Server status: %s', state.launchStatus);
  });
})();

export default app;
