export const respond = (response, result) => {
  if (result && result.then) {
    result
    .then(payload => {
      response.status(200).json({
        code: 1,
        payload
      });    
    })
    .catch(err => {
      console.error(err);
      err = err || {code: 0};
      response.status(200).json({
        code: err.code
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