import ApiResult from '@models/ApiResult';

export interface UserIF {
  email: string;
};

export default class UserSignUpResult extends ApiResult {
  public user: UserIF;

  constructor(data) {
    super();
    this.user = data;
  }
};
