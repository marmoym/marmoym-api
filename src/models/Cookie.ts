import * as ms from 'ms';

export default class Cookie {
  public key: string;
  public maxAge: number;
  public value: string;

  constructor({
    key,
    maxAge,
    value,
  }: {
    key: string,
    maxAge: string,
    value: string,
  }) {
    this.maxAge = ms(maxAge);
    this.key = key;
    this.value = value;
  }
};
