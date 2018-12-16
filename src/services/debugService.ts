import { Request, Response } from 'express';

import ApiResponse from '@@models/ApiResponse';

export async function getDebug() {
  return new ApiResponse({
    status: 'ok',
  });
};

// class DebugResult extends ApiResponse {
//   status: string;

//   constructor({
//     status,
//   }) {
//     super();
//     this.status = status;
//   }
// }