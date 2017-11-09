import HttpMethod from '@models/HttpMethod';
import * as ApiUrl from '@models/ApiUrl';
import GetDefinitionsParam from '@models/RequestParams/GetDefinitionsParam';
import { requireNonNull, optional } from '@src/utils/objectUtils';

export default {
  [ApiUrl.DEFINITIONS]: {
    [HttpMethod.POST]: (req) => {
      return new GetDefinitionsParam({
        defIds: requireNonNull(req.body['defIds']),
        offset: optional(req.body['offset']).orElse(null),
      });
    }
  }
};
