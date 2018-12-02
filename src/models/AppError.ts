import { format } from 'util';

import { 
  ResponseTypeEntry,
} from '@@models/ResponseType';

export default class AppError extends Error {
  public code: number;
  public desc: string;
  public label: string;

  constructor() {
    super();
  }

  static of({
    args,
    error,
    responseType,
  }: OfParams) {
    const apiError = new AppError();
    apiError.code = responseType.code;
    apiError.desc = args ? format(responseType.desc, ...args) : responseType.desc;
    apiError.label = responseType.label;
    return apiError;
  }
};

interface OfParams {
  args?: any[];
  error?: Error;
  responseType: ResponseTypeEntry;
}
