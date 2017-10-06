import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import db from '../../database';
import * as UserInsertDAO from '../../dao/User/UserInsertDAO';
import * as UserSelectDAO from '../../dao/User/UserSelectDAO';
import { transaction } from '../../database/databaseUtils';
import { authConfig } from '../../config/marmoym-config';
import MarmoymError from "../../models/MarmoymError";
import ErrorType from '../../models/ErrorType';

export const checkUsernameUsed = async (req) => {
  const userSelected = await UserSelectDAO.selectUserByUsername(req.username);

  if (userSelected.length == 0) {
    //TODO return value 는 정해져야함
    return "NotUsedUsername";
  } else {
    return "UsedUsername";
  }
}

export const checkEmailUsed = async (req) => {
  const userSelected = await UserSelectDAO.selectUserByEmail(req.email);

  if (userSelected.length == 0) {
    //TODO return value 는 정해져야함
    return "NotUsedEmail";
  } else {
    return "UsedEmail";
  }
}