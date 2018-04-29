import ApiParam from '@models/ApiParam';

export default class DefinitionGetParam extends ApiParam {
  public email: string;
  public password: string;

  constructor({
    email,
    password,
  }) {
    super();
    this.email = email;
    this.password = password
  }

  public values() {
    return {
      email: this['email'],
      password: this['password'],
    }
  }
};
