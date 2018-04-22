/**
 * Copyright Marmoym 2017
 */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import AppRouter from '@routes/AppRouter';
import AppStatus from '@constants/AppStatus';
import errorHandler from './middlewares/errorHandler';
import db from '@src/database';
import KnexDAO from '@daos/knex/KnexDAO';
import Logger from '@modules/Logger';
import marmoymConfig from '@config/marmoymConfig';

const app: express.Application = express();

// State that changes according to the DB launch status
const state = {
  status: AppStatus.LAUNCHING,
  dirname: __dirname,
};

// Connect to Database and check sanity
KnexDAO.getMigrations(db, {})
  .then((res) => {
    Logger.info('DB connection success');
    state.status = AppStatus.LAUNCHED;
    app.emit('appStarted');
  })
  .catch((err) => {
    Logger.error('DB connection error');
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
}, AppRouter.routes());
app.use(errorHandler);

// Launch the server
app.listen(marmoymConfig.app.port, function(err) {
  if (err) {
    return console.error(err);
  }
  Logger.info('Listening at port: %s', marmoymConfig.app.port);
});

export default app;
