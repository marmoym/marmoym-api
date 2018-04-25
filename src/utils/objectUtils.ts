export class EnhancedTypeError extends Error {
  public code;

  constructor(message) {
    super(message);
    this.code = 'TYPE_INVALID';
  }
}

function isEmpty(str: string) {
  return (!str || 0 === str.length);
}

export function requireOneOf(val, candidates) {
  if (!candidates.length) {
    new Error('Candidate is not given');
  }

  for (let i = 0; i < candidates.length; i++) {
    if (val === candidates[i]) {
      return val;
    }
  }

  throw new TypeError(`require one of ${candidates}, but given ${val}`);
};

export function requireNonEmpty(obj, err?) {
  if (obj === undefined || null || isEmpty(obj)) {
    throw err
      ? err
      : new EnhancedTypeError(`require non empty`);
  } else {
    return obj;
  }
};

export function requireNonNull(obj, err?) {
  if (obj === undefined || null) {
    throw (err)
      ? err
      : new TypeError();
  } else {
    return obj;
  }
};

export function optional(val1) {
  return {
    orElse: (val2) => {
      return val1 ? val1 : val2;
    },
    onlyIfNull: (val2) => {
      return val2 ? null : val1;
    },
  };
};
