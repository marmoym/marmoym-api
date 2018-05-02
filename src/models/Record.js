const DEFAULT_VALUES = Symbol('defaultValues');
const VALUES = Symbol('values');

export const IS_RECORD = '__isRecord';
export const VERSION = '__version';

/**
 * Record that serves as data template.
 * Inspired by Immutable.js Record.
 * 
 * @author Elden S. Park
 * @see https://github.com/facebook/immutable-js/blob/master/src/Record.js
 */
export default function Record(defaultValues) {
  const RecordType = class {
    constructor(values) {
      this[DEFAULT_VALUES] = defaultValues;
      this[VALUES] = values;
    }

    get(key) {
      return this[DEFAULT_VALUES][key] !== undefined 
        ? this[VALUES][key] !== undefined
          ? this[VALUES][key]
          : this._defaultValues[key]
        : undefined;
    }

    toJSON() {
      let result = {};
      Object.keys(this[DEFAULT_VALUES]).map((key) => {
        result[key] = this[VALUES][key] ? this[VALUES][key] : this[DEFAULT_VALUES][key];
      });
      return result;
    }
  };

  RecordType.prototype[IS_RECORD] = true;
  RecordType[VERSION] = '0.1.2';
  return RecordType;
};
