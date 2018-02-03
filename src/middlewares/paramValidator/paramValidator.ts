import * as logger from '@src/modules/logger';
import * as ApiURL from '@constants/ApiURL';
import Constant from '@constants/Constant';
import MarmoymError from '@models/MarmoymError';
import ErrorType from '@constants/ErrorType';
import requestMap from './requestMap';

/**
 * Validates the http request parameter and if it passes the test,
 * assign it to a key `VALIADATED_PARAM` of request object
 */
export default function paramValidator(req, res, next) {
    const param = _validate(req);
    req[Constant.VALIDATED_PARAM] = param;
    next();
};

function _validate(req): {} {
    try {
      const path = _removeTrailingSlash(req.path);
      const param = requestMap[path][req.method](req);
      return param;
    } catch (e) {
      if (e.type && e.type === ErrorType.RESOURCE_NOT_FOUND) {
        throw new MarmoymError(ErrorType.REQUEST_PARAMETER_INSUFFICIENT);
      }
      throw e;
    }
  }
  
/**
 * Removes the trailing slash,
 *
 * e.g. /api/v1/user/
 *      /api/v1/user
 * Both should be handled the same.
 */
function _removeTrailingSlash(path): string {
return (path[path.length - 1] === '/')
    ? path.substring(0, path.length - 1)
    : path;
}
