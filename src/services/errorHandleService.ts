/**
 * ...
 */
export const handleError = (err, req, res, next) => {
  res.send({
    code: "Error"
  });
}