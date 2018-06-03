import ApiResult from '@models/ApiResult';

export interface User {
  username: string;
}

export default class UserSignInResult extends ApiResult {
  public user: User;
  
  constructor(data) {
    super();
    this.user = data;
  }
};
