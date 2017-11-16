import HttpMethod from '@models/HttpMethod';
import * as ApiURL from '@models/ApiUrl';
import GetDefinitionsParam from '@models/RequestParams/GetDefinitionsParam';
import { requireNonNull, optional } from '@src/utils/objectUtils';

export default {
  [ApiURL.DEFINITIONS]: {
    [HttpMethod.POST]: (req) => {
      return new GetDefinitionsParam({
        defIds: optional(req.body['defIds']).orElse(null),
        offset: optional(req.body['offset']).orElse(null),
      });
    }
  },
  [ApiURL.DEFINITIONS_NEW]: {
    [HttpMethod.POST]: (req) => {
      return null;
    },
  },
  [ApiURL.DEFINITIONS_IDS]: {
    [HttpMethod.GET]: (req) => {
      return null;
    }
  }
};
