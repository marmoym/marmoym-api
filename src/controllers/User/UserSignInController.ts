import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import db from '../../database';
import * as UserInsertDAO from '@daos/User/UserInsertDAO';
import * as UserSelectDAO from '@daos/User/UserSelectDAO';
import { transaction } from '../../database/databaseUtils';
import authConfig from '@config/authConfig';
import MarmoymError from "../../models/MarmoymError";
import ErrorType from '@constants/ErrorType';
import SignInUserParam from '@models/RequestParam/SignInUserParam';

export async function signInUser(param: SignInUserParam) {
  const userSelected = await UserSelectDAO.selectUserByEmail(param.email);
  
  if (userSelected.length == 0) {
    throw new MarmoymError(ErrorType.USER_NOT_FOUND);
  } else {
    const userInfo = userSelected[0];
    
    if (userInfo.status == 'P') {
      throw new MarmoymError(ErrorType.USER_STATUS_PENDING);
    }

    if (bcrypt.compareSync(param.password, userInfo.password)) {
      const token = jwt.sign(
        {
          userId: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
        },
        authConfig.jwtSecret,
        {
          expiresIn: authConfig.tokenExpireDuration
        }
      );

      return {
        id: userInfo.id,
        token,
        username: userInfo.username,
        email: userInfo.email,
      };

    } else {
      throw new MarmoymError(ErrorType.USER_INCORRECT_PASSWORD);
    }
  }
}
