import * as bcrypt from 'bcrypt';

import db from '../../database';
import * as UserSelectDAO from '../../dao/User/UserSelectDAO';
import * as UserUpdateDAO from "../../dao/User/UserUpdateDAO";
import { transaction } from '../../database/databaseUtils';
import { authConfig } from '../../config/marmoym-config';
import MarmoymError from "../../models/MarmoymError";
import ErrorType from '../../models/ErrorType';

export async function getUserInfo(req) {
  const userSelected = await UserSelectDAO.selectUserByUserId(req.userId);

  if (userSelected.length == 0) {
    throw new MarmoymError(ErrorType.User.USER_NOT_FOUND);
  } else {
    return userSelected;
  }
}