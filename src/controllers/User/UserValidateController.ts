import * as UserController from './UserController';

export const validateUsername = async (req) => {
  return await UserController.checkUsernameExist(req.params.username);
  // if (result) {
  //   res.status(200).json({
  //     message: 'User Exist'
  //   });
  // } else {
  //   res.status(404).json({
  //     code: 0, 
  //     message: 'User Not Exist'
  //   });
  // }
}

export const validateEmail = async (req) => {
  return await UserController.checkUserEmailExist(req.params.useremail);
  // if (result) {
  //   res.status(200).json({
  //     message: 'UserEmail Exist'
  //   });
  // } else {
  //   res.status(404).json({
  //     code: 0, 
  //     message: 'UserEmail Not Exist'
  //   });
  // }
}