import {
  Application,
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import chalk from 'chalk';

const middlewareAttach: MiddlewareAttach = function (app, middlewareDefs) {
  middlewareDefs.map(({ middlewares, path }) => {
    console.info(
      `[middleware-attach] middleware is attached at path: ${chalk.yellow('%s')}, middlewares: %s`, 
      path || 'VOID',
      getMiddlewareNames(middlewares),
    );
    if (path) {
      app.use(path, middlewares);
    } else {
      app.use(middlewares);
    }
  });
};

export default middlewareAttach;

interface MiddlewareAttach {
  (
    app: Application, 
    middlewareDefs: MiddlewareDefinition[],
  ): void;
}

export interface MiddlewareDefinition {
  middlewares: (RequestHandler | ErrorRequestHandler)[];
  path?: string;
}

function getMiddlewareNames(middlewares: Function[] | Function): string {
  if (Array.isArray(middlewares)) {
    return `[ ${middlewares.map((m) => m.name).join(', ')} ]`; 
  } else {
    return middlewares.name;
  }
}
