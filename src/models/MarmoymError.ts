import { format } from 'util';

/**
 * 
 * @version 0.0.1
 */
export default class MarmoymError extends Error {
  code: number;
  name: string;

  private constructor() {
    super();
  }

  public static of({
    args,
    error,
    type,
  }) {
    const dashboardError = new MarmoymError();
    dashboardError.code = type.code;
    dashboardError.name = type.name;
    dashboardError.message = format(type.message, ...args);
    dashboardError.stack = error && error.stack
      ? `${dashboardError.stack}'\nThe error originating from:\n${error.stack}`
      : dashboardError.stack;
    return dashboardError;
  }
};
