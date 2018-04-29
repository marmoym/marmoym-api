import ApiResult from '@models/ApiResult';

export default class UserSignInResult extends ApiResult({
  
}) {
  

  constructor(data) {
    super({
      definitions: data,
    });
  }
};
