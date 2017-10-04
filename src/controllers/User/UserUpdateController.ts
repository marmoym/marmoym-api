import * as bcrypt from 'bcrypt';

import * as authService from '../../services/authService';
import * as UserValidateController from './UserValidateController';
import { authConfig } from '../../config/marmoym-config';
import db1 from '../../database';


export const updateUserInfo = async (req) => {
  let params = req.body;
  let encodedPw = bcrypt.hashSync(params.pw, authConfig.jwtSecret);
  return await db1.user.update(
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