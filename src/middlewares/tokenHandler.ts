import * as jwt from 'jsonwebtoken';
import * as winston from 'winston';

import marmoymConfig from '@config/marmoymConfig';
import AppError from "@models/AppError";
// import ErrorType from '@constants/ErrorType';

/**
 * ...
 */
 async function _verifyUserToken(token: string, userId: number) {
  let decoded;
  try {
    decoded = jwt.verify(token, marmoymConfig.auth['jwtSecret']);
    winston.debug('JWT decoded: ', decoded);
  } catch(err) {
    // throw new AppError(ErrorType.TOKEN_INVALID);
  }

  if (decoded.id == userId) {
    return decoded;
  } else {
    // throw new AppError(ErrorType.TOKEN_AND_USER_ID_INCOMPATIBLE);
  }
};

/**
 * ...
 */
export default function tokenAuthHandler(req, res, next) {
  const token = req.headers['x-access-token'];
  const userId = req.body.userId ? req.body.userId : req.params.userId;
  
  _verifyUserToken(token, userId)
    .then(result => {
      req['_token'] = result;
      next();
    })
    .catch(err => {
      next(err);
    });
};
