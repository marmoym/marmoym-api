import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as ms from 'ms';

import AppError from "@models/AppError";
import Cookie from '@models/Cookie';
import db from '@database/db';
import Logger from '@modules/Logger'
import ResponseType from '@models/ResponseType';
import Token from '@modules/Token';
import UserSelectDAO from '@daos/User/UserSelectDAO';
import UserSignInResult from '@models/user/UserSignInResult';
import marmoymConfig from '@config/marmoymConfig';

export default class UserSignInService {
  public static async signInUser(param) {
    try {
      const data = await UserSelectDAO.selectUserByEmail(db, param.values());

      if (!data) {
        throw AppError.of({
          args: [ param.email ],
          type: ResponseType.USER_NOT_FOUND,
        });
      }

      if (await bcrypt.compare(param.password, data.password)) {
        const token = await Token.create({
          payload: {
            dashboardUserId: data.dashboard_user_id,
            username: data.username,
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
      } else {
        throw AppError.of({
          args: [ param.email ],
          type: ResponseType.USER_CREDENTIAL_INVALID,
        });
      }
    } catch (err) {
      throw AppError.of({
        type: ResponseType.USER_NOT_FOUND,
      });
    }
  }
};
