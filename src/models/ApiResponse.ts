import ApiError from '@@models/ApiError';
import Cookie from '@@models/Cookie';

const COOKIES = Symbol('cookies');

export default class ApiResponse<T> {
  [COOKIES]: Cookie[] = [];
  error?: ApiError;
  payload: T

  constructor(payload: T, error?: ApiError) {
    this.payload = payload;
    if (error) {
      this.error = error;
    }
  }

  public getCookies() {
    return this[COOKIES];
  }

  public setCookie(cookie: Cookie) {
    this[COOKIES].push(cookie);
    return this;
  }
};
