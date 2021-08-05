import { isAfter } from 'date-fns';
import { getError } from './errors.js';

export function validateUserDetailProp(
  prop,
  userDetailsFieldName,
  propFieldName
) {
  switch (userDetailsFieldName) {
    case 'experience':
      return validateExperienceProp(prop, propFieldName);
  }

  return null;
}

function validateExperienceProp(prop, fieldName) {
  switch (fieldName) {
    case 'company':
    case 'position': {
      const maxLength = 100;

      const company = prop.company.trim();
      if (company.length === 0) {
        return getError('e1000');
      }

      if (company.length > maxLength) {
        return getError('e1100', maxLength);
      }
      return null;
    }

    case 'start': {
      if (!prop.start) {
        return getError('e1000');
      }

      const start = new Date(prop.start);
      const end = new Date(prop.end);

      if (isAfter(end, start)) {
        return getError('e1201', ['Period', start.toLocaleDateString()]);
      }

      if (isAfter(end, new Date().setHours(0, 0, 0, 0))) {
        return getError('e1203', ['period end date', 'today']);
      }

      return null;
    }

    case 'end': {
      if (prop.end === 'current') {
        return null;
      }

      if (!prop.end) {
        return getError('e1000');
      }

      const start = new Date(prop.start);
      const end = new Date(prop.end);

      if (isAfter(start, end)) {
        return getError('e1201', ['Period', start.toLocaleDateString()]);
      }

      if (isAfter(end, new Date().setHours(0, 0, 0, 0))) {
        return getError('e1203', ['period end date', 'today']);
      }
    }
  }

  return null;
}
