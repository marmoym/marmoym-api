import Cookie from '@models/Cookie';

const COOKIES = Symbol('cookies');

export default class ApiResult<T> {
  payload: T

  constructor(payload) {
    this[COOKIES] = [];
    this.payload = payload;
  }

  public getCookies() {
    return this[COOKIES];
  }

  public setCookie(cookie: Cookie) {
    this[COOKIES].push(cookie);
    return this;
  }
};
