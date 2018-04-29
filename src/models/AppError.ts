import { format } from 'util';

export const VERSION = '__version';

export default class AppError extends Error {
  public code;
  public name;
  static [VERSION] = '0.0.1';

  constructor() {
    super();
  }

  static of(param: {
    args?,
    error?
    type,
  }) {
    const apiError = new AppError();
    apiError.code = param.type.code;
    apiError.name = param.type.name;
    apiError.message = format(param.type.message, ...param.args)
    apiError.stack = param.error && param.error.stack
      ? `${apiError.stack}'\nThe error originating from:\n${param.error.stack}`
      : apiError.stack;
    return apiError;
  }
};
