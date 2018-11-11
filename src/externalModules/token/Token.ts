import chalk from 'chalk';
import * as jwt from 'jsonwebtoken';
import * as ms from 'ms';

const TokenError = {
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
      console.error(`[Token] 'privateKey', 'tokenDuration' undefined. Possibly ${chalk.yellow('not initialized')}.`);
      return false;
    }
  }

  static create<T> ({
    payload,
  }: CreateParams<T>): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!state.initialized) {
        reject({ error: TokenError.TOKEN_NOT_INITIALIZED });
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
            reject({ error: TokenError.TOKEN_CREATE_ERROR });
          } else {
            console.debug(`Token is generated: %s`, token);
            resolve(token);
          }
        });
    });
  }

  static decode<T> ({
    token,
  }: DecodeParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!state.initialized) {
        reject({ error: TokenError.TOKEN_NOT_INITIALIZED });
      }

      jwt.verify(
        token, 
        state.privateKey, 
        (err, decoded: T) => {
          if (err) {
            reject({ error: TokenError.TOKEN_DECODE_ERROR });
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }
}

interface CreateParams<T> {
  payload: T,
}

interface DecodeParams {
  token: string;
}