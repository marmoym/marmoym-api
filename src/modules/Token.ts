import * as jwt from 'jsonwebtoken';
import * as ms from 'ms';

export const AUTH_TOKEN = 'auth-token';
export const VERSION = '__version';

const TOKEN_ERROR = {
  TOKEN_CREATE_ERROR: 'TOKEN_CREATE_ERROR',
  TOKEN_DECODE_ERROR: 'TOKEN_DECODE_ERROR',
  TOKEN_NOT_INITIALIZED: 'TOKEN_NOT_INITIALIZED',
};

const state: {
  initialized: boolean,
  privateKey: undefined | string,
  tokenDuration: undefined | string,
} = {
  initialized: false,
  privateKey: undefined,
  tokenDuration: undefined,
};

export default class Token {
  static [VERSION] = '0.0.3';

  static initialize({
    privateKey,
    tokenDuration = '1d',
  }): boolean {
    if (privateKey !== undefined && tokenDuration !== undefined) {
      state.privateKey = privateKey;
      state.tokenDuration = tokenDuration;
      state.initialized = true;
      return true;
    } else {
      throw Error('Token should be initialized with `private key` and `token duration`');
    }
  }

  static create({
    payload,
  }): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!state.initialized) {
        reject({ error: TOKEN_ERROR.TOKEN_NOT_INITIALIZED });
      }

      jwt.sign(
        payload,
        state.privateKey,
        { 
          expiresIn: state.tokenDuration,
        },
        (err, token: string) => {
          if (err) {
            console.error(err);
            reject({ error: TOKEN_ERROR.TOKEN_CREATE_ERROR });
          } else {
            console.debug(`Token is generated: %s`, token);
            resolve(token);
          }
        });
    });
  }

  static decode({
    token,
  }): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      if (!state.initialized) {
        reject({ error: TOKEN_ERROR.TOKEN_NOT_INITIALIZED });
      }

      jwt.verify(
        token, 
        state.privateKey, 
        (err, decoded: object) => {
          if (err) {
            reject({ error: TOKEN_ERROR.TOKEN_DECODE_ERROR });
          } else {
            resolve(decoded);
          }
        }
      );
    });
  }
};
