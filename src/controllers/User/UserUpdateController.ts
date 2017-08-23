import * as bcrypt from 'bcrypt';

import * as authService from '../../services/authService';
import * as UserValidateController from './UserValidateController';
import config from '../../config';
import { db1 } from '../../database';


export const updateUserInfo = async (req) => {
  let params = req.body;
  let encodedPw = bcrypt.hashSync(params.pw, config.auth.JWT_SECRET);
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