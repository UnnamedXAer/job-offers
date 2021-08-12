import { getError } from './errors';

export function validateTextLength(val, maxLength) {
  const valLen = val.trim().length;
  if (valLen === 0) {
    return getError('e1000');
  }

  if (valLen > maxLength) {
    return getError('e1103', maxLength);
  }

  return null;
}
