/**
 * Copyright Marmoym 2017
 */
import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
// import morgan from 'morgan';

import config from './config'
import * as errorHandleService from './services/errorHandleService';

import routes from './routes';
import database from './database';

const app: express.Application = express();
const port: number = process.env.PORT || config.server.PORT;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logger
// app.use(morgan('dev'));

app.use("/", routes);
app.use(errorHandleService.handleError); // Should sit at the end of app.xxx calls.

database
  .init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });

export default app;