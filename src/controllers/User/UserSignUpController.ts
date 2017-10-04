import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import * as UserController from './UserController';
import { authConfig } from '../../config/marmoym-config';
import db from '../../database';

/**
 * ...
 */
export const signUpUser = async (username, password, email) => {
  let encodedPw = bcrypt.hashSync(password, authConfig.auth.hashSalt);
  return db.User.create({
    username,
    password: encodedPw,
    email
  });
}