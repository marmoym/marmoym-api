import MarmoymError from '@models/MarmoymError';
import ErrorType from '@constants/ErrorType';

/**
 * ErrorMeta is an object of two properties: Error Type and Error Message.
 */
export function requireNonNull(obj, err?: {}) {
  if (obj === undefined || null) {
    throw (err)
      ? err
      : new MarmoymError(ErrorType.RESOURCE_NOT_FOUND);
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
