import { Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import ApiResult from '@models/ApiResult';

class DebugResult extends ApiResult {
  status: string;

  constructor({
    status,
  }) {
    super();
    this.status = status;
  }
}

export default class DebugAction {
  public static async getDebug(req: Request, res: Response) {
    return new DebugResult({
      status: 'ok',
    });
  }
};
