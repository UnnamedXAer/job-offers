const errors = {
  e1000: 'This field is required.',
  e1100: 'Text cannot exceed $0 characters.',
  e1101: 'Too many positions, please reduce to $0.',
  e1200: 'The $0, cannot be greater than $1.',
  e1201: '$0 end range value cannot be less than start ($1).',
  e1202: 'The $0 cannot be less than $1.',
  e1300: 'Negative values are not acceptable.'
};

/**
 * @param {keyof errors} code - error code
 * @param {[]=} params - optional array of parameters to be inserted in error message
 * @returns error message for given `code`
 */
const getError = (code, params) => {
  let msg = errors[code];
  if (params) {
    params.forEach(p => (msg = msg.replace(/\$\d/, p)));
  }
  return msg;
};

export const company = val =>
  val.trim().length === 0
    ? 'Please select for witch of your companies is this offer.'
    : null;

export const title = val => {
  const len = val.trim().length;
  if (len === 0) {
    return getError('e1000');
  }

  if (len > 150) {
    return getError('e1100', [150]);
  }

  return null;
};

export const description = val =>
  val.trim().length > 5000 ? getError('e1100', [5000]) : null;

export const list = (val, maxLen) =>
  val.length > maxLen ? getError('e1101', [maxLen]) : null;

export const salary = (start, end, touched) => {
  const errors = { start: null, end: null };
  const startNum = Number(start);
  if (start === '') {
    errors.start = getError('e1000');
    if (touched.end) {
      if (end === '') {
        errors.end = errors.start;
      }
    }
    return errors;
  }

  if (startNum < 1) {
    errors.start = getError('e1202', ['salary', '1k']) + '😒';
  }

  const endNum = Number(end);

  if (touched.end) {
    if (end === '') {
      errors.end = getError('e1000');
    } else if (endNum < startNum) {
      errors.end = getError('e1201', ['Salary', startNum + 'k']);
    }
  }

  return errors;
};
