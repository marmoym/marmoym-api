export default {
  EMAIL_ALREADY_USED: {
    label: 'EMAIL_ALREADY_USED',
    code: 401005,
    message: 'email already used'
  },
  NOT_ERROR_OBJECT: {
    label: 'NOT_ERROR_OBJECT',
    code: 401006,
    message: 'Not error object',
  },
  REQUEST_TYPE_UNKNOWN: {
    label: 'REQUEST_TYPE_UNKNOWN',
    code: 999001,
    message: 'Neither validator is defined or incorrect request',
  },
  REQUEST_PARAMETER_INSUFFICIENT: {
    label: 'REQUEST_PARAMETER_INSUFFICIENT',
    code: 999002,
    message: 'Parameter is not sufficiently provided',
  },
  RESOURCE_NOT_FOUND: {
    label: 'RESOURCE_NOT_FOUND',
    code: 404001,
    message: 'text',
  },
  SUCCESS: {
    label: 'SUCCESS',
    code: 200000,
    message: 'SUCCESS' 
  },
  TERM_NOT_FOUND: {
    label: 'TERM_NOT_FOUND',
    code: 403001,
    message: 'Term not exist' 
  },
  TOKEN_INVALID: {
    label: 'TOKEN_INVALID',
    code: 402001,
    message: 'Invalid token'
  },
  TOKEN_AND_USER_ID_INCOMPATIBLE: {
    label: 'TOKEN_AND_USER_ID_INCOMPATIBLE',
    code: 402002,
    message: 'Not equal user id'
  },
  TYPE_ERROR: {
    label: 'TYPE_INVALID',
    code: 400002,
    message: 'TypeError occurred',
  },
  RESPONSE_TYPE_UNDEFINED: {
    label: 'RESPONSE_TYPE_UNDEFINED',
    code: 400001,
    message: 'Response type is not defined. Most likely Error, not AppError, is thrown',
  },
  USER_DELETE_FAIL: {
    label: 'USER_DELETE_FAIL',
    code: 401003,
    message: 'no user deleted'
  },
  USER_CREDENTIAL_INVALID: {
    label: 'USER_CREDENTIAL_INVALID',
    code: 401001,
    message: 'text' // TODO: to be changed soon
  },
  USER_NOT_FOUND: {
    label: 'USER_NOT_FOUND',
    code: 401000,
    message: 'text' // TODO: to be changed soon
  },
  USER_STATUS_PENDING: {
    label: 'USER_STATUS_PENDING',
    code: 401006,
    message: 'User Status is Pending'
  },
  USER_UPDATE_VALUES_EMPTY: {
    label: 'USER_UPDATE_VALUES_EMPTY',
    code: 401002,
    message: 'user update values are empty'
  },
  USER_USERNAME_ALREADY_USED: {
    label: 'USER_USERNAME_ALREADY_USED',
    code: 401004,
    message: 'username already used'
  },
}
