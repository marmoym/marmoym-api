/**
 * Copyright Marmoym 2017
 */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as winston from 'winston';
import { serverConfig, logConfig } from './config/marmoym-config'
import * as errorHandleService from './services/errorHandleService';
import routes from './routes';
import db from '@src/database';

const app: express.Application = express();
const port: number = process.env.PORT || serverConfig['marmoym-dev1'].port;

winston.configure({
  transports: [
    new winston.transports.Console({
      level: logConfig['marmoym-dev1'].logLevel,
    }),
  ],
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);
app.use(errorHandleService.handleError);

app.listen(serverConfig['marmoym-dev1'].port, () => {
  winston.debug(`Listening on ${serverConfig['marmoym-dev1'].port}`);
});

export default app;
