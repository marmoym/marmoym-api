export default function Record(defaultValues) {
  // Disable new constructor, since this is only to be used by plain function call
  if (this instanceof Record) {
    throw new Error('Record is to be used without `new` keyword');
  }

  const RecordProtoType = class Record {
    static [VERSION] = '0.0.3';
    __isRecord = true;

    constructor(data) {
      const props = {};
      for (let key in defaultValues) {
        props[key] = {
          writable: false,
          enumerable: true,
          value: data[key] ? data[key] : defaultValues[key],
        }
      }
      Object.defineProperties(this, props);
    }

    /**
     * Some component, e.g. d3 tries to mutate the object thus writable 
     * `false` not applicable. Returns iterable key values as writable.
     */
    cloneValues() {
      return { ...this };
    }
  }

  return RecordProtoType;
};

export const VERSION = '__version';
