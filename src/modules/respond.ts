import * as winston from 'winston';

// import ResponseCode from '@constants/ResponseCode';

export default function respond(response, result, name?: string) {
  if (result && result.then) {
    result.then(payload => {
      response.status(200).json({
        // code: ResponseCode.SUCCESS,
        payload: name ?
          { [name]: createPayload(payload) }
          : createPayload(payload),
      });    
    })
      .catch(err => {
        winston.error(err);
        response.status(200).json({
          // code: err.code || ResponseCode.ERROR,
        });
      });
  }
  else {
    response.status(200).json({
      code: 1,
      payload: createPayload(result),
    });
  }
};

function createPayload(data) {
  if (typeof data === 'string') {
    return data;
  } else if (typeof data === 'object') {
    return { ... data };
  } else {
    return data;
  }
}
