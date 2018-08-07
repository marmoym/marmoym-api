import { getCustomRepository } from 'typeorm';

import AppError from "@models/AppError";
import ApiResult from '@models/ApiResult';
import Cookie from '@models/Cookie';
import Crypt from '@modules/Crypt';
import { DB1 } from '@modules/Database';
import Logger from '@modules/Logger'
import marmoymConfig from '@config/marmoymConfig';
import ResponseType from '@models/ResponseType';
import Token, { AUTH_TOKEN } from '@modules/Token';
import User from '@entities/User';
import { UserRepository } from '@repos/UserRepository';

export default {
  async signInUser(param) {
    try {
      const userRepo = getCustomRepository(UserRepository, DB1);
      const user = (await userRepo.find({
        select: [ 'username', 'password' ],
        where: {
          email: param.email,
        },
      }))[0];
  
      if (user === undefined) {
        throw AppError.of({
          args: [ param.email ],
          type: ResponseType.USER_NOT_FOUND,
        });
      }
  
      const passwordMatch = await Crypt.compare({
        src: param.password, 
        hash: user.password,
      });
      
      if (passwordMatch === false) {
        throw AppError.of({
          args: [ param.email ],
          type: ResponseType.USER_CREDENTIAL_INVALID,
        });
      }
  
      const token = await Token.create({
        payload: {
          username: user.username,
        },
      });
  
      return new ApiResult({
        user: {
          email: param.email,
        },
      }).setCookie(new Cookie({
        key: AUTH_TOKEN,
        maxAge: marmoymConfig.auth.tokenDuration,
        value: token,
      }));
    } catch (err) {
      throw err;
    }
  },
  async signUpUser({
    email,
    password,
    username,
  }: SignUpUserParam) {
    try {
      const userRepo = getCustomRepository(UserRepository, DB1);
      
      const [ userByEmail ] = await userRepo.find({
        where: {  
          email: email,
        },
      });
  
      const [ userByUsername ] = await userRepo.find({
        where: {
          username: username,
        }
      });

      if (userByEmail !== undefined) {
        throw AppError.of({
          type: ResponseType.USER_EMAIL_ALREADY_REGISTERED,
        });
      }

      if (userByUsername !== undefined) {
        throw AppError.of({
          type: ResponseType.USER_USERNAME_ALREADY_REGISTERED,
        });
      }
  
      const hashedPassword = await Crypt.hash({
        data: password,
        saltRound: marmoymConfig.auth.saltRound,
      });
  
      const result = await userRepo.save(new User({
        email,
        password: hashedPassword,
        username,
      }));
  
      return new ApiResult<{user: {}}>({
        user: {
          username: result.username,
        },
      });
    } catch (err) {
      throw err;
    }
  }
};

export interface SignUpUserParam {
  email: string,
  password: string,
  username: string,
};
