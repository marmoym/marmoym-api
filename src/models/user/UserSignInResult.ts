import ApiResult from '@models/ApiResult';
import Record from '@models/Record';

export default class UserSignInResult extends ApiResult({
  user: {
    email: '',
  },
}) {
  constructor(values) {
    super(values);
  }
};
