export default class Cookie {
  public key: string;
  public maxAge: number;
  public value: string;

  constructor({
    key,
    maxAge,
    value,
  }) {
    this.maxAge = maxAge;
    this.key = key;
    this.value = value;
  }
};
