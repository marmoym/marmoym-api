import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import * as UserController from './UserController';
import config from '../../config';
import models from '../../models/db';

/**
 * ...
 */
export const signUpUser = async (username, password, email) => {
  let encodedPw = bcrypt.hashSync(password, config.auth.HASH_SALT);
  return models.user.create({
    username,
    password: encodedPw,
    email
  });
}