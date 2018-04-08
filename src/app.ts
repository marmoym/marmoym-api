/**
 * Copyright Marmoym 2017
 */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import serverConfig from '@config/serverConfig';
import logConfig from '@config/serverConfig';
import * as errorHandleService from './middlewares/errorHandler';
import routes from './routes';
import db from '@src/database';
import logger from '@src/modules/logger';

const app: express.Application = express();
const port: number = process.env.PORT || serverConfig['marmoym-dev1'].port;

app.use(morgan('tiny'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", (req, res, next) => {
  // if (state.status === AppStatus.LAUNCHING) {
  //   res.send({
  //     message: 'App is launching. Reload after 15 seconds.',
  //   });
  // } else if (state.status === AppStatus.DATABASE_ERROR) {
  //   res.status(500)
  //     .send({
  //       code: ResponseType.DATABASE_CONNECTION_FAIL.code,
  //       message: ResponseType.DATABASE_CONNECTION_FAIL.message,
  //     });
  // } else {
  //   next();
  // }
  next();
}, routes);
app.use(errorHandleService.handleError);

// app.listen(serverConfig['marmoym-dev1'].port, () => {
//   logger.debug(`[BEGIN] Express listening on ${serverConfig['marmoym-dev1'].port}`);
// });

export default app;
