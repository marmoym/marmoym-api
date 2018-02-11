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
app.use("/", routes);
app.use(errorHandleService.handleError);

app.listen(serverConfig['marmoym-dev1'].port, () => {
  logger.debug(`[BEGIN] Express listening on ${serverConfig['marmoym-dev1'].port}`);
});

export default app;
