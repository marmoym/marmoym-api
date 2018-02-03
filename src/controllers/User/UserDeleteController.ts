import * as bcrypt from 'bcrypt';

import db from '../../database';
import * as UserDeleteDAO from '@daos/User/UserDeleteDAO';
import { transaction } from '../../database/databaseUtils';
import MarmoymError from "@models/MarmoymError";
import ErrorType from '@constants/ErrorType';

export function deleteUser(req) {
  return transaction(async trx => {
    const userDeleted = await UserDeleteDAO.deleteUserByUserId(trx, req.userId);

    if (userDeleted == 1) {
      return 'UserDeleteSuccess';
    } else {
      throw new MarmoymError(ErrorType.USER_DELETE_FAIL);
    }
  });
}
