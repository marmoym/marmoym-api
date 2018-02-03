import * as winston from 'winston';

import ResponseCode from '@constants/ResponseCode';

/**
 * ...
 */
export function enhance(fn) {
  return (req, res, next) => {
    fn(req, res, next)
      .then(data => {
        res.status(200)
          .json({
            code: ResponseCode.SUCCESS,
            payload: data,
          })
      })
      .catch(next);
  }
}
