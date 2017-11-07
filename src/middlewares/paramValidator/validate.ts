import requestMap from './requestHandler';
import MarmoymError from '@models/MarmoymError';
import ErrorType from '@models/ErrorType';

export default function validate(req): {} {
  try {
    console.log(123, requestMap, req.path, req.method);
    const param = requestMap[req.path][req.method](req);
    console.log('param', param);
  } catch (e) {
    throw new MarmoymError(ErrorType.MSC.TEMP);
  }
  return 22;
}