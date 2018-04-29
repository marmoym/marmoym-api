import Cookie from '@models/Cookie';
import Record from '@models/Record';

/**
 * ...
 */
export default function ApiResult(defaultValues) {
  if (this instanceof ApiResult) {
    throw new Error('ApiResult is not to be used with `new` operator');
  }

  const ApiResultProtoType = class ApiResult extends Record(defaultValues) {
    static [VERSION] = '0.0.1'; 

    constructor(data) {
      super(data);
      this[COOKIE_SYMBOL] = [];
    }

    getCookies() {
      return this[COOKIE_SYMBOL];
    }
  
    setCookie(cookie: Cookie) {
      console.log('set cookies', cookie);
      this[COOKIE_SYMBOL].push(cookie);
      return this;
    }
  
    // deleteCookie() {
    //   delete this.cookies;
    // }
  };

  ApiResultProtoType.prototype[IS_API_RESULT] = true;
  return ApiResultProtoType;
};

const COOKIE_SYMBOL = Symbol('COOKIE');
export const IS_API_RESULT = '__isApiResult';
export const VERSION = '__version';
