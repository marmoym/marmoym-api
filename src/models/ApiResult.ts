import Cookie from '@models/Cookie';
import Record from '@models/Record';

const COOKIES = Symbol('cookies');

export default class ApiResult {
  constructor() {
    this[COOKIES] = [];
  }

  public getCookies() {
    return this[COOKIES];
  }

  public setCookie(cookie: Cookie) {
    this[COOKIES].push(cookie);
    return this;
  }
};
