import { getCustomRepository } from 'typeorm';

import AppError from "@models/AppError";
import ApiResult from '@models/ApiResult';
import Cookie from '@models/Cookie';
import Crypt from '@modules/Crypt';
import { DB1 } from '@modules/Database';
import { isEmpty } from '@utils/objectUtils';
import Logger from '@modules/Logger'
import marmoymConfig from '@config/marmoymConfig';
import ResponseType from '@models/ResponseType';
import Token from '@modules/Token';
import User from '@entities/User';
import { UserRepository } from '@repos/UserRepository';

export async function signInUser(param) {
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
      key: 'auth-token',
      maxAge: marmoymConfig.auth.tokenDuration,
      value: token,
    }));
  } catch (err) {
    throw err;
  }
};

export async function signUpUser(param) {
  try {
    const userRepo = getCustomRepository(UserRepository, DB1);
    
    const user = await userRepo.find({
      where: {  
        email: param.email,
      },
    });

    if (user.length > 0) {
      throw AppError.of({
        type: ResponseType.USER_ALREADY_REGISTERED,
      });
    }

    const hashedPassword = await Crypt.hash({
      data: param.password,
      hashSalt: marmoymConfig.auth.hashSalt,
    });

    const result = await userRepo.save(new User({
      email: param.email,
      password: hashedPassword,
      username: param.username,
    }));

    return new ApiResult<{user: {}}>({
      user: {
        username: result.username,
      },
    });
  } catch (err) {
    throw err;
  }
};
