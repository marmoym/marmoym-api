import MarmoymError from '@models/MarmoymError';
import ErrorType from '@models/ErrorType';

export function requireNonNull(obj, errMsg?: string) {
  if (obj === undefined || null) {
    throw new MarmoymError(ErrorType.MSC.RESOURCE_NOT_FOUND);
  } else {
    return obj;
  }
}

export function optional(val) {
  return {
    orElse: function(val2) {
      return val ? val : val2;
    }
  }
}
