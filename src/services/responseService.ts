import * as winston from 'winston';

export const respond = (response, result) => {
  if (result && result.then) {
    result.then(payload => {
      response.status(200).json({
        code: 1,
        payload
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