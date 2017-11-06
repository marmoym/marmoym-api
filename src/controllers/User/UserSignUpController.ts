import * as bcrypt from 'bcrypt';

import db from '../../database';
import * as UserInsertDAO from '../../dao/User/UserInsertDAO';
import * as UserSelectDAO from '../../dao/User/UserSelectDAO';
import { transaction } from '../../database/databaseUtils';
import { authConfig } from '../../config/marmoym-config';
import MarmoymError from "../../models/MarmoymError";
import ErrorType from '../../models/ErrorType';

export function signUpUser(req) {
  return transaction(async trx => {
    const userSelectedByEmail = await UserSelectDAO.selectUserByEmail(req.email); // check email exist
    const userSelectedByUsername = await UserSelectDAO.selectUserByUsername(req.username) // check  username exist
    
    if (userSelectedByEmail.length == 0 && userSelectedByUsername.length == 0) {
      const encodedPw = bcrypt.hashSync(req.password, authConfig.hashSalt);
      const userInserted = await UserInsertDAO.insertUser(trx, req, encodedPw);

      return 'UserSignUpSuccess'
    } else if (userSelectedByEmail.length == 0) {
      throw new MarmoymError(ErrorType.USER.EMAIL_ALREADY_USED);
    } else {
      throw new MarmoymError(ErrorType.USER.USERNAME_ALREADY_USED);
    }
  });
}