import Cookie from '@models/Cookie';
import Record from '@models/Record';

/**
 * ...
 */
export default function ApiResult(defaultValues) {
  if (this instanceof ApiResult) {
    throw new Error();
  }
  
  const ApiResultProtoType = class ApiResult extends Record(defaultValues) {
    private cookies: Cookie[] = undefined;
    public static [IS_API_RESULT] = true;

    constructor(data) {
      super(data);
      this.cookies = [];
    }

    getCookies() {
      return this.cookies;
    }
  
    setCookie(cookie: Cookie) {
      this.cookies.push(cookie);
      return this;
    }
  
    deleteCookie() {
      delete this.cookies;
    }
  };

  return ApiResultProtoType;
};

export const IS_API_RESULT = '__isApiResult';
