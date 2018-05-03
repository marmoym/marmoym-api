export default {
  EMAIL_ALREADY_USED: {
    code: 401005,
    label: 'EMAIL_ALREADY_USED',
    message: 'email already used'
  },
  NOT_ERROR_OBJECT: {
    code: 401006,
    label: 'NOT_ERROR_OBJECT',
    message: 'Not error object',
  },
  REQUEST_TYPE_UNKNOWN: {
    code: 999001,
    label: 'REQUEST_TYPE_UNKNOWN',
    message: 'Neither validator is defined or incorrect request',
  },
  REQUEST_PARAMETER_INSUFFICIENT: {
    code: 999002,
    label: 'REQUEST_PARAMETER_INSUFFICIENT',
    message: 'Parameter is not sufficiently provided',
  },
  RESOURCE_NOT_FOUND: {
    code: 404001,
    label: 'RESOURCE_NOT_FOUND',
    message: 'Resource is not found',
  },
  RESPONSE_NOT_PROVIDED: {
    code: 404002,
    label: 'RESPONSE_NOT_PROVIDED',
    message: 'Request is routed but did not get the response',
  },
  SUCCESS: {
    code: 200000,
    label: 'SUCCESS',
    message: 'SUCCESS' 
  },
  TERM_NOT_FOUND: {
    code: 403001,
    label: 'TERM_NOT_FOUND',
    message: 'Term not exist' 
  },
  TOKEN_INVALID: {
    code: 402001,
    label: 'TOKEN_INVALID',
    message: 'Invalid token'
  },
  TOKEN_AND_USER_ID_INCOMPATIBLE: {
    code: 402002,
    label: 'TOKEN_AND_USER_ID_INCOMPATIBLE',
    message: 'Not equal user id'
  },
  RESPONSE_TYPE_NOT_API_RESULT: {
    code: 400001,
    label: 'RESPONSE_TYPE_NOT_API_RESULT',
    message: 'Response type is not ApiResult. Most likely some undefined Error has occurred',
  },
  USER_DELETE_FAIL: {
    code: 401003,
    label: 'USER_DELETE_FAIL',
    message: 'no user deleted'
  },
  USER_CREDENTIAL_INVALID: {
    code: 401001,
    label: 'USER_CREDENTIAL_INVALID',
    message: 'user credential is invalid: %s',
  },
  USER_NOT_FOUND: {
    code: 401000,
    label: 'USER_NOT_FOUND',
    message: 'text' // TODO: to be changed soon
  },
  USER_STATUS_PENDING: {
    code: 401006,
    label: 'USER_STATUS_PENDING',
    message: 'User Status is Pending'
  },
  USER_UPDATE_VALUES_EMPTY: {
    code: 401002,
    label: 'USER_UPDATE_VALUES_EMPTY',
    message: 'user update values are empty'
  },
  USER_ALREADY_REGISTERED: {
    code: 401004,
    label: 'USER_ALREADY_REGISTERED',
    message: 'username is already registered: %s',
  },
}
