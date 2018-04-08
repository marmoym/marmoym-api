/**
 * Copyright Marmoym 2017
 */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import AppStatus from '@constants/AppStatus';
import * as errorHandleService from './middlewares/errorHandler';
import routes from './routes';
import db from '@src/database';
import Logger from '@src/modules/Logger';
import KnexDAO from '@daos/knex/KnexDAO';

const app: express.Application = express();

export const state = {
  status: AppStatus.LAUNCHING,
  dirname: __dirname,
};

KnexDAO.getMigrations(db, {})
  .then((res) => {
    Logger.info('db connection success');
    state.status = AppStatus.LAUNCHED;
    app.emit('appStarted');
  })
  .catch((err) => {
    Logger.error('db connection error');
    state.status = AppStatus.DATABASE_ERROR;
  });;

app.use(morgan('tiny'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", (req, res, next) => {
  if (state.status === AppStatus.LAUNCHING) {
    res.send({
      message: 'App is launching. Reload after 15 seconds.',
    });
  } else if (state.status === AppStatus.DATABASE_ERROR) {
    res.status(500)
      .send({
        // code: ResponseType.DATABASE_CONNECTION_FAIL.code,
        // message: ResponseType.DATABASE_CONNECTION_FAIL.message,
      });
  } else {
    next();
  }
  next();
}, routes);
app.use(errorHandleService.handleError);

export default app;
