import BaseEntity from '@entities/BaseEntity';

class User extends BaseEntity {
  public static _NAME: string = 'user';
  public static USERNAME: string = 'username';
  public static PASSWORD: string = 'password';
  public static EMAIL: string = 'email';
  public static KARMA: string = 'karma';
  public static STATUS: string = 'status';

  constructor(param: User) {
    super();
  }
}

export default User;
