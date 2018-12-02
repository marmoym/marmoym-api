import chalk from 'chalk';
import * as jwt from 'jsonwebtoken';

const logTag = chalk.cyan('[token]');

const TokenError = {
  TOKEN_CREATE_ERROR: 'TOKEN_CREATE_ERROR',
  TOKEN_DECODE_ERROR: 'TOKEN_DECODE_ERROR',
  TOKEN_NOT_INITIALIZED: 'TOKEN_NOT_INITIALIZED',
};

export default class Token<P> {
  isInitialized: boolean = false;
  privateKey: string | undefined;
  tokenDuration: string | undefined;

  public constructor({
    privateKey,
    tokenDuration = '1d',
  }: ContructorArgs) {
    if (privateKey !== undefined && tokenDuration !== undefined) {
      this.isInitialized = true;
      this.privateKey = privateKey;
      this.tokenDuration = tokenDuration;

      console.log(
        `${logTag} token is initialized with %o`,
        arguments[0],
      );
    } else {
      console.error(`${logTag} 'privateKey' or 'tokenDuration' undefined`);
      throw new Error('token argument not legit');
    }
  }

  public create({
    payload,
  }: CreateArgs<P>): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      rejectIfNotInitialized(this.isInitialized, reject);

      jwt.sign(
        payload,
        this.privateKey,
        {
          expiresIn: this.tokenDuration,
        },
        (err, token: string) => {
          if (err) {
            console.error(`${logTag} error while generating token, %o`, err);
            reject({ error: TokenError.TOKEN_CREATE_ERROR });
          } else {
            resolve(token);
          }
        });
    });
  }

  public decode({
    token,
  }: DecodeArgs): Promise<P> {
    return new Promise<P>((resolve, reject) => {
      rejectIfNotInitialized(this.isInitialized, reject);

      jwt.verify(
        token, 
        this.privateKey, 
        (err, decoded: P) => {
          if (err) {
            console.error(`${logTag} error while decoding token, %o`, err);
            reject({ error: TokenError.TOKEN_DECODE_ERROR });
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }
}

function rejectIfNotInitialized(isInitialized: boolean, reject: (any) => any): void {
  if (!isInitialized) {
    console.error(`${logTag} token is not initialized`);
    reject({ error: TokenError.TOKEN_NOT_INITIALIZED });
  }
}

interface ContructorArgs {
  privateKey: string;
  tokenDuration: string;
}

interface CreateArgs<T> {
  payload: T;
}

interface DecodeArgs {
  token: string;
}
