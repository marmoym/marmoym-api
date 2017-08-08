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
<<<<<<< Updated upstream
export const respond = (res, result) => {
=======
export const respond = async (res, result) => {
>>>>>>> Stashed changes
  res.status(200).json({
    code: 1,
    payload: result
  });
};