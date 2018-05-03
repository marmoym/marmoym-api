import ApiResult from '@models/ApiResult';
import Record from '@models/Record';

export default class UserSignUpResult extends ApiResult({
  user: {
    email: '',
  },
}) {
  constructor(values) {
    super(values);
  }
};
