import { isAfter, isBefore, isDate, parseISO, startOfDay } from 'date-fns';
import { validateTextLength } from './common';
import { getError } from './errors';

export const login = (fieldName, val) => {
  switch (fieldName) {
    case 'emailAddress':
      return emailAddress(val);
    case 'password':
      return validateTextLength(val, 9999);
  }

  throw new Error('login: validation: unknown field: "' + fieldName + '"');
};

export const registration = (fieldName, val) => {
  switch (fieldName) {
    case 'emailAddress':
      return emailAddress(val);
    case 'password':
      return password(val);
    case 'DOB':
      return DOB(val);
  }

  throw new Error('login: validation: unknown field: "' + fieldName + '"');
};

export const emailAddress = val => {
  const email = val.trim();
  if (email.length === 0) {
    return getError('e1000');
  }

  const re = new RegExp('^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$');

  if (!re.test(email)) {
    return getError('e1501', ['Email address']);
  }
  return null;
};

export const password = val => {
  const minLen = 6;
  const maxLen = 250;
  const password = val.trim();
  if (password.length === 0) {
    return getError('e1000');
  }
  if (password.length < minLen) {
    return getError('e1102', [minLen]);
  }
  if (password.length > maxLen) {
    return getError('e1103', [maxLen]);
  }

  if (!/\d/.test(password)) {
    return getError('e1401', ['digit']);
  }

  if (!/\w/.test(password)) {
    return getError('e1401', ['letter']);
  }

  return null;
};

export const firstName = val => validateTextLength(val, 50);
export const lastName = val => validateTextLength(val, 50);

export const DOB = val => {
  if (val.trim().length === 0) {
    return null;
  }

  const date = parseISO(val);

  if (!isDate(date.getTime())) {
    return getError('1501', ['Date']);
  }

  if (isBefore(startOfDay(new Date(1900, 0, 1)), date)) {
    return getError('1501', ['Date']);
  }
  if (isAfter(startOfDay(new Date()), date)) {
    return getError('e1205', ['date', 'today']);
  }

  return null;
};

export const avatarUrl = val => {
  const maxLen = 2083; // IE max
  const url = val.trim();
  if (url.length > maxLen) {
    return getError('e1501', ['Seems like url']);
  }

  return null;
};
