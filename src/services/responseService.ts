/**
 * Example
 */
let response = {
  code: 'SOME_CODE',
  payload: 'DATA'
}

/**
 * ...
 */
export const respond = (response, result) => {
  result
    .then(payload => {
      response.status(200).json({
        code: 1,
        payload: payload
      });    
    })
    .catch(err => {
      console.error(err);
      err = err || {code: 0};
      response.status(200).json({
        code: err.code
      });
    });
};