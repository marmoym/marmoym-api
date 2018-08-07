export interface ResponseTypeEntry {
  code: number;
  desc: string;
  label: string;
};

const ResponseType = {
  EMAIL_ALREADY_USED: {
    code: 401005,
    desc: 'email already used',
    label: 'EMAIL_ALREADY_USED',
  },
  INITIALIZATION_ERROR: {
    code: 500000,
    desc: 'App is not initialized',
    label: 'INITIALIZATION_ERROR',
  },
  NOT_ERROR_OBJECT: {
    code: 401006,
    desc: 'Not error object',
    label: 'NOT_ERROR_OBJECT',
  },
  REQUEST_TYPE_UNKNOWN: {
    code: 999001,
    desc: 'Neither validator is defined or incorrect request',
    label: 'REQUEST_TYPE_UNKNOWN',
  },
  REQUEST_PARAMETER_INSUFFICIENT: {
    code: 999002,
    desc: 'Parameter is not sufficiently provided',
    label: 'REQUEST_PARAMETER_INSUFFICIENT',
  },
  RESOURCE_NOT_FOUND: {
    code: 404001,
    desc: 'Resource is not found',
    label: 'RESOURCE_NOT_FOUND',
  },
  RESPONSE_NOT_PROVIDED: {
    code: 404002,
    desc: 'Request is routed but did not get the response',
    label: 'RESPONSE_NOT_PROVIDED',
  },
  ROUTE_NOT_DEFINED: {
    code: 404003,
    desc: 'Route is not defined',
    label: 'ROUTE_NOT_DEFINED',
  },
  SUCCESS: {
    code: 200000,
    desc: 'SUCCESS',
    label: 'SUCCESS',
  },
  TERM_NOT_FOUND: {
    code: 403001,
    desc: 'Term not exist',
    label: 'TERM_NOT_FOUND',
  },
  TOKEN_INVALID: {
    code: 402001,
    desc: 'Invalid token',
    label: 'TOKEN_INVALID',
  },
  TOKEN_VOID: {
    code: 402002,
    desc: 'Token is not present',
    label: 'TOKEN_VOID',
  },
  RESPONSE_TYPE_NOT_API_RESULT: {
    code: 400001,
    desc: 'Internal Error has occurred',
    label: 'RESPONSE_TYPE_NOT_API_RESULT',
  },
  USER_CREDENTIAL_INVALID: {
    code: 401001,
    desc: 'user credential is invalid: %s',
    label: 'USER_CREDENTIAL_INVALID',
  },
  USER_DELETE_FAIL: {
    code: 401003,
    desc: 'no user deleted',
    label: 'USER_DELETE_FAIL',
  },
  USER_EMAIL_ALREADY_REGISTERED: {
    code: 401005,
    desc: 'user email is already registered: %s',
    label: 'USER_EMAIL_ALREADY_REGISTERED',
  },
  USER_NOT_FOUND: {
    code: 401000,
    desc: 'User is not found, email: %s',
    label: 'USER_NOT_FOUND',
  },
  USER_STATUS_PENDING: {
    code: 401006,
    desc: 'User Status is Pending',
    label: 'USER_STATUS_PENDING',
  },
  USER_UPDATE_VALUES_EMPTY: {
    code: 401002,
    desc: 'user update values are empty',
    label: 'USER_UPDATE_VALUES_EMPTY',
  },
  USER_USERNAME_ALREADY_REGISTERED: {
    code: 401004,
    desc: 'username is already registered: %s',
    label: 'USER_ALREADY_REGISTERED',
  },
};

export default ResponseType;

