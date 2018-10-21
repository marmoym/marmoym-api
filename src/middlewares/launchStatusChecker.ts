import { Handler, Request, Response, NextFunction } from 'express';

import LaunchStatus from '@constants/LaunchStatus';
import ResponseType from '@models/ResponseType';
import { State } from '@src/app';

const launchStatusChecker = (state: State) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

export default launchStatusChecker;
