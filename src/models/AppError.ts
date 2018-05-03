import { format } from 'util';

import ResponeType from '@models/ResponseType';

export const VERSION = '__version';

export default class AppError extends Error {
  public code;
  public name;
  static [VERSION] = '0.0.1';

  constructor() {
    super();
  }

  static of({
    args,
    error,
    type,
  }: {
    args?: any[],
    error?,
    type,
  }) {
    const apiError = new AppError();
    apiError.code = type.code;
    apiError.name = type.name;
    apiError.message = args ? format(type.message, ...args) : type.message;
    apiError.stack = error && error.stack
      ? `${apiError.stack}'\nThe error originating from:\n${error.stack}`
      : apiError.stack;
    return apiError;
  }
};
