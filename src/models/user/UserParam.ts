import ApiParam from '@models/ApiParam';

export default class UserParam extends ApiParam {
  email: string;
  password: string;
  username?: string;

  constructor({
    email,
    password,
    username,
  }: {
    email: string,
    password: string,
    username?,
  }) {
    super();
    this.email = email;
    this.password = password;
    this.username = username;
  }
};
