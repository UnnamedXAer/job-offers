const errors = {
  e1000: 'This field is required.',
  e1100: 'Text cannot exceed $0 characters.',
  e1101: 'Too many positions, please reduce to $0.',
  e1102: 'Minimum $0 characters is required.',
  e1103: 'Maximum $0 characters is allowed.',
  e1200: '$0 start range value cannot be greater than end ($1).',
  e1201: '$0 end range value cannot be less than start ($1).',
  e1202: 'The $0 cannot be less than $1.',
  e1203: 'The $0 cannot be earlier than $1',
  e1204: 'The $0, cannot be greater than $1.',
  e1205: 'The $0, cannot be later than $1.',
  e1300: 'Negative values are not acceptable.',
  e1401: 'At least one $0 is required.',
  e1501: '$0 is not valid.'
};

/**
 * @param {keyof errors} code - error code
 * @param {[]=} params - optional array of parameters to be inserted in error message
 * @returns error message for given `code`
 */
export const getError = (code, params) => {
  let msg = errors[code];
  if (params) {
    params.forEach(p => (msg = msg.replace(/\$\d/, p)));
  }
  return msg;
};
