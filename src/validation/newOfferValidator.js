import { addDays, isAfter, parseISO } from 'date-fns';
import { getError } from './errors.js';

export const company = val =>
  val.trim().length === 0
    ? 'Please select for which of your companies is this offer.'
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

export const expirationDate = date => {
  const minDate = addDays(new Date().setHours(0, 0, 0, 0), 3);
  const selectedDate = parseISO(date);
  if (isAfter(minDate, selectedDate)) {
    return getError('e1203', ['Expiration Date', minDate.toLocaleDateString()]);
  }
  return null;
};
