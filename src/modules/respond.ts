import * as winston from 'winston';

import ResponseCode from '@constants/ResponseCode';

export default function respond(response, result, name?: string) {
  if (result && result.then) {
    result.then(payload => {
      response.status(200).json({
        code: ResponseCode.SUCCESS,
        payload: name ?
          { [name]: payload }
          : { ...payload }
      });    
    })
      .catch(err => {
        winston.error(err);
        response.status(200).json({
          code: err.code || '000000'
        });
      });
  }
  else {
    response.status(200).json({
      code: 1,
      payload: result
    })
  }
};