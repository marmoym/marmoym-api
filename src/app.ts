/**
 * Copyright Marmoym 2017
 */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as winston from 'winston';
import config from './config'
import * as errorHandleService from './services/errorHandleService';
import routes from './routes';
import database from './database';

const app: express.Application = express();
const port: number = process.env.PORT || config.server['marmoym-dev1'].port;

winston.configure({
  transports: [
    new winston.transports.Console({level: config.log['marmoym-dev1'].logLevel})
  ]
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);
app.use(errorHandleService.handleError); // Should sit at the end of app.xxx calls.

database
  .init()
  .then(() => {
    app.listen(port, () => {
        winston.info(`Server started on port ${port}`);
    });
  });

export default app;