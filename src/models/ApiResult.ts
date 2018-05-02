import Cookie from '@models/Cookie';
import Record from '@models/Record';

const COOKIES = Symbol('cookies');

export const IS_API_RESULT = '__isApiResult';
export const VERSION = '__version';

/**
 * ...
 */
export default function ApiResult(defaultValues) {
  let isInitialized = false;

  const ApiResult = class extends Record(defaultValues) {
    constructor(values) {
      super(values);
      this[COOKIES] = [];
    }

    public getCookies() {
      return this[COOKIES];
    }

    public setCookie(cookie: Cookie) {
      this[COOKIES].push(cookie);
      return this;
    }
  }

  ApiResult.prototype[IS_API_RESULT] = true;
  ApiResult[VERSION] = '0.1.0';
  return ApiResult;
};
