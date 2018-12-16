import { Request, Response } from 'express';

import ApiResult from '@@models/ApiResult';

export async function getDebug() {
  return new ApiResult({
    status: 'ok',
  });
};

// class DebugResult extends ApiResult {
//   status: string;

//   constructor({
//     status,
//   }) {
//     super();
//     this.status = status;
//   }
// }