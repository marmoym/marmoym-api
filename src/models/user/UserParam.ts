import ApiParam from '@models/ApiParam';

export default class UserParam extends ApiParam {
  public email: string;
  public password: string;
  public username: string;

  constructor(param) {
    super();
    this.email = param.email;
    this.password = param.password;
    this.username = param.username;
  }

  public values() {
    return {
      email: this.email,
      password: this.password,
      username: this.username,
    };
  }
};
