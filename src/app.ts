/**
 * Copyright Marmoym 2017-2018
 */
import "reflect-metadata";

import attach from '@nodekit/express-middleware-attach';
import express from "express";

import { initializeDB } from '@entities/db';
import { expressLog } from '@modules/Log';
import LaunchStatus from '@constants/LaunchStatus';
import marmoymConfig from '@config/marmoymConfig';
import middlewares from './app.middlewares';
import state from '@src/state';
import Token from '@externalModules/token/Token';

expressLog.info('App is running in NODE_ENV: %s, LOCAL: %s', process.env.NODE_ENV, process.env.LOCAL);

const app = express();

(async function prepareModules() {
  Token.initialize({
    privateKey: marmoymConfig.auth.privateKey,
    tokenDuration: marmoymConfig.auth.tokenDuration,
  });

  const dbIsInitialized = await initializeDB();
  
  state.update({
    launchStatus: dbIsInitialized ? LaunchStatus.INIT_SUCCESS : LaunchStatus.INIT_ERROR,
  });

  attach(app, middlewares);
  
  app.listen(marmoymConfig.app.port, (err) => {
    if (err) {
      console.error(err);
    }
    
    expressLog.info('Listening at port: %s', marmoymConfig.app.port);
    expressLog.info('Server status: %s', state.launchStatus);
  });
})();

export default app;
