import * as authService from '../../services/authService';
import * as UserValidateController from './UserValidateController';
import config from '../../config';
import models from '../../models/db';
import * as bcrypt from 'bcrypt';

export const updateUserInfo = async (req) => {
  let params = req.body;
  let encodedPw = bcrypt.hashSync(params.pw, config.auth.JWT_SECRET);
  return await models.user.update(
    {
      password: encodedPw,
      email: params.email
    }, 
    {
      where : {
        username : params.username
      }
    })
    .then(result => "UpdateSuccess")
    .catch(err => "Error")
}