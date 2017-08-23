export const handleError = (err, req, res, next) => {
  if (err.constructor.name == 'MarmoymError') {
    console.log(err);
    res.send({
      code: err.code,
      msg: err.msg
    });
  } else {
    console.log(err);
    res.send({
      code: '000000',
      msg: 'Internal Error'
    });
  }
}