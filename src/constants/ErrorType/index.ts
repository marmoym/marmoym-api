import UserError from './UserError';

const ErrorType = {
  ...UserError
};

const _insertTypeIntoObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key]['type'] = key;
    }
  }
  return obj;
};

/**
 * We modify the object, @link {ErrorType} by invoking in the middle of file,
 * because this way the IDE can deterministically suggest the literal
 * based on what is defined inside the object @link {ErrorType}.
 */
_insertTypeIntoObject(ErrorType);

export default ErrorType;