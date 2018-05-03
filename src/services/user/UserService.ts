import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as ms from 'ms';

import AppError from "@models/AppError";
import Cookie from '@models/Cookie';
import Crypt from '@modules/Crypt';
import db from '@database/db';
import Logger from '@modules/Logger'
import ResponseType from '@models/ResponseType';
import Token from '@modules/Token';
import UserDAO from '@daos/User/UserDAO';
import UserSignInResult from '@models/user/UserSignInResult';
import UserSignUpResult from '@models/user/UserSignUpResult';
import marmoymConfig from '@config/marmoymConfig';

export default class UserSignInService {
  public static async signInUser(param) {
    try {
      const user = await UserDAO.selectUserByEmail(db, param.values());

      if (!user) {
        throw AppError.of({
          args: [ param.email ],
          type: ResponseType.USER_NOT_FOUND,
        });
      }

      const passwordMatch = await bcrypt.compare(param.password, user.password);
      
      if (passwordMatch === false) {
        throw AppError.of({
          args: [ param.email ],
          type: ResponseType.USER_CREDENTIAL_INVALID,
        });
      }

      const token = await Token.create({
        payload: {
          dashboardUserId: user.dashboard_user_id,
          username: user.username,
        },
      });
      Logger.debug(`Token is generated %j`, token);
  
      return new UserSignInResult({
        user: {
          email: param.email,
        }
      }).setCookie(new Cookie({
        key: 'auth-token',
        maxAge: ms(marmoymConfig.auth.tokenDuration),
        value: token,
      }));
    } catch (err) {
      throw err;
    }
  }

  public static async signUpUser(param) {
    try {
      // Validate if the credential can be registered.
      const user = await UserDAO.selectUserByEmail(db, param.values());
      if (user !== undefined) {
        throw AppError.of({
          type: ResponseType.USER_ALREADY_REGISTERED,
        });
      }

      const hashedPassword = await Crypt.hash({
        data: param.password,
        hashSalt: marmoymConfig.auth.hashSalt,
      });

      const result = await db.transaction(async (trx) => {
        const userInserted = await UserDAO.insertUser(trx, {
          ...param.values(),
          password: hashedPassword, 
        });
        return userInserted.rowCount;
      });

      return new UserSignUpResult({
        user: {
          email: param.email,
        },
      });
    } catch (err) {
      throw err;
    }
  }
};
