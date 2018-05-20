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
import initialize from './initialize';
import Logger from '@modules/Logger';
import marmoymConfig from '@config/marmoymConfig';
import ResponseType from '@models/ResponseType';

const app: express.Application = express();

// State that changes according to the DB launch status
const state = {
  status: AppStatus.LAUNCHING,
  dirname: __dirname,
};

initialize().then((res) => {
  state.status = AppStatus.LAUNCHED;
});

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
        code: ResponseType.INITIALIZATION_ERROR.code,
        message: ResponseType.INITIALIZATION_ERROR.message,
      });
  } else {
    console.log(123, 3);
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
