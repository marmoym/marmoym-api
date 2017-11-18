import HttpMethod from '@constants/HttpMethod';
import * as ApiURL from '@constants/ApiUrl';
import { requireNonNull, optional } from '@src/utils/objectUtils';
import SignInUserParam from '@models/RequestParam/SignInUserParam';

export default {
  [ApiURL.SESSION_NEW]: {
    [HttpMethod.POST]: (req) => {
      return new SignInUserParam({
        email: requireNonNull(req.body['email']),
        password: requireNonNull(req.body['password']),
      });
    },
  },
};
