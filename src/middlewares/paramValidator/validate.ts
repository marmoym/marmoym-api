import requestHandler from './requestHandler';
import MarmoymError from '@models/MarmoymError';
import ErrorType from '@models/ErrorType';

export default function validate(req): {} {
  try {
    const path = _removeTrailingSlash(req.path);
    const param = requestHandler[path][req.method](req);
    return param;
  } catch (e) {
    throw new MarmoymError(ErrorType.MSC.REQUEST_TYPE_UNKNOWN);
  }
}

function _removeTrailingSlash(path): string {
  return (path[path.length - 1] === '/') ? 
    path.substring(0, path.length - 1)
    : path;
}