export default class Cookie {
  public maxAge: number;
  public name: string;
  public value: string;

  constructor({
    maxAge,
    name,
    value,
  }) {
    this.maxAge = maxAge;
    this.name = name;
    this.value = value;
  }
};
