import requestHandler from './requestHandler';
import MarmoymError from '@models/MarmoymError';
import ErrorType from '@models/ErrorType';

export default function validate(req): {} {
  try {
    const param = requestHandler[req.path][req.method](req);
    return param;
  } catch (e) {
    throw new MarmoymError(ErrorType.MSC.TEMP);
  }
}