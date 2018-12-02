import { 
  NextFunction,
  Request, 
  RequestHandler,
  Response, 
} from 'express';

import { expressLog } from '@@modules/Log';
import LaunchStatus from '@@constants/LaunchStatus';
import ResponseType from '@@models/ResponseType';
import { State } from '@@models/state';

export default function launchStatusCheckerWrapper(state: State): RequestHandler {
  expressLog.info('[launchStatusChecker] create checker with state: %o', state);

  return function launchStatusChecker(req: Request, res: Response, next: NextFunction) {
    if (state.launchStatus === LaunchStatus.NOT_YET_INTIALIZED) {
      res.send({
        message: 'App is launching. Reload after a few seconds.',
      });
    } else if (state.launchStatus === LaunchStatus.INIT_ERROR) {
      res.status(500)
        .send({
          code: ResponseType.INITIALIZATION_ERROR.code,
          message: ResponseType.INITIALIZATION_ERROR.desc,
        });
    } else {
      next();
    }
  };
};
