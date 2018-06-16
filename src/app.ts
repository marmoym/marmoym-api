/**
 * Copyright Marmoym 2017
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import AppStatus from '@constants/AppStatus';
import corsHandler from '@middlewares/corsHandler';
import errorHandler from './middlewares/errorHandler';
import initialize from './initialize';
import Logger from '@modules/Logger';
import marmoymConfig from '@config/marmoymConfig';
import ResponseType from '@models/ResponseType';
import routes from '@routes/routes';

const app: express.Application = express();

const state = {
  status: AppStatus.LAUNCHING,
  dirname: __dirname,
};

initialize().then((res) => {
  state.status = AppStatus.LAUNCHED;
});

app.use(morgan('tiny'))
app.use(corsHandler());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (state.status === AppStatus.LAUNCHING) {
    res.send({
      message: 'App is launching. Reload after 15 seconds.',
    });
  } else if (state.status === AppStatus.DATABASE_ERROR) {
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
app.use(errorHandler);

app.listen(marmoymConfig.app.port, function(err) {
  if (err) {
    return console.error(err);
  }
  Logger.info('Listening at port: %s', marmoymConfig.app.port);
});

export default app;
export {
  state,
};
