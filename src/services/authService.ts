import * as jwt from 'jsonwebtoken';
import * as winston from 'winston';
import MarmoymError from '../models/MarmoymError'
import config from '../config';
import ErrorType from '../constants/ErrorType';

/**
 * ...
 */
const _verifyUserToken = async (token: string, username: any) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.auth.jwtSecret);
    winston.debug('JWT decoded: ', decoded);
  } catch(err) {
    throw new MarmoymError(ErrorType.TOKEN_INVALID);
  }

  if (decoded.username == username) {
    return decoded;
  } else {
    throw new MarmoymError(ErrorType.USERNAME_NOT_EQUAL);
  }
};

/**
 * ...
 */
export const tokenAuthHandler = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const username = req.body.username;

  _verifyUserToken(token, username)
    .then(result => {
      req['_token'] = result;
      next();
    });
};