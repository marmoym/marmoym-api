import * as bcrypt from 'bcrypt';

import db from '../../database';
import * as UserSelectDAO from '@daos/User/UserSelectDAO';
import * as UserUpdateDAO from "@daos/User/UserUpdateDAO";
import { transaction } from '../../database/databaseUtils';
import authConfig from '@config/authConfig';
import MarmoymError from "../../models/MarmoymError";
// import ErrorType from '@constants/ErrorType';

export async function getUserInfo(req) {
  const userSelected = await UserSelectDAO.selectUserByUserId(req.userId);

  if (userSelected.length == 0) {
    // throw new MarmoymError(ErrorType.USER_NOT_FOUND);
  } else {
    return userSelected;
  }
}
