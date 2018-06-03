import { Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import ApiResult from '@models/ApiResult';

class DebugResult extends ApiResult({
  debug: {},
}) {
  constructor(data) {
    super({
      debug: data,
    });
  }
}

export default class DebugAction {
  public static async getDebug(req: Request, res: Response) {
    return new DebugResult({
      status: 'ok',
    });
  }
};
