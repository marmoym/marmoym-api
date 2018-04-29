export const VERSION = '__version';

export default class ApiParam {
  static [VERSION] = '0.0.1';
  /**
   * 
   */
  protected constructor() {}

  values() {
    throw Error('values() of param model is not implemented');
  }
};
