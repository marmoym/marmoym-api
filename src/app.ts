/**
 * ...
 */
import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

// import cors from 'cors';
// import morgan from 'morgan';

import config from './config'
import * as errorHandleService from './services/errorHandleService';
// import initializeDb from './db';
// import middleware from './middleware';

import routes from './routes';
import * as modelService from './services/modelService';

// Express Application
const app: express.Application = express();

// port
const port: number = process.env.PORT || config.server.PORT;

//CORS
app.use(cors())

/**
 * Parses http post request body
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * All the routes start in the file "routes.js"
 */
app.use("/", routes);

// logger
// app.use(morgan('dev'));

// 3rd party middleware
// app.use(cors({
//   exposedHeaders: config.corsHeaders
// }));

app.use(errorHandleService.handleError);

/**
 * ...
 */
modelService
  .initializeDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });

export default app;