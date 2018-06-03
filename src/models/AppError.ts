import { format } from 'util';

import ResponseType, { ResponseTypeEntry } from '@models/ResponseType';

export const VERSION = Symbol('version');

export default class AppError extends Error {
  static [VERSION] = '0.0.2';

  public code: number;
  public desc: string;
  public label: string;

  constructor() {
    super();
  }

  static of({
    args,
    error,
    type,
  }: {
    args?: any[],
    error?: Error,
    type: ResponseTypeEntry,
  }) {
    const apiError = new AppError();
    apiError.code = type.code;
    apiError.label = type.label;
    apiError.desc = args ? format(type.desc, ...args) : type.desc;
    return apiError;
  }
};
