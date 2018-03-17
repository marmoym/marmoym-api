import HttpMethod from '@constants/HttpMethod';
import * as ApiURL from '@constants/ApiURL';
import { requireNonNull, optional } from '@src/utils/objectUtils';
import SignInUserParam from '@models/requestParam/SignInUserParam';
import SignUpUserParam from '@models/requestParam/SignUpUserParam';
import ErrorType from '@constants/ErrorType';

export default {
  [ApiURL.SESSION_NEW]: {
    [HttpMethod.POST]: (req) => {
      return new SignInUserParam({
        email: requireNonNull(req.body['email']),
        password: requireNonNull(req.body['password']),
      });
    },
  },
  [ApiURL.USERS_NEW]: {
    [HttpMethod.POST]: (req) => {
      return new SignUpUserParam({
        email: requireNonNull(req.body['email']),
        password: requireNonNull(req.body['password']),
        username: requireNonNull(req.body['username']),
      });
    },
  },
};
