import * as jwt from 'jsonwebtoken';

import config from '../config';


/**
 * ...
 */
const _verifyUserToken = (token: string, username: any) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.auth.JWT_SECRET);
    console.log('decoded', decoded);
  } catch(err) {
    throw new Error('401002, invalid token');
  }

  if (decoded.username == username) {
    return Promise.resolve(decoded);
  } else {
    return Promise.reject(null);
  }
}

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
    })
    .catch(err => {
      next();
      // throw new Error();
    });
}