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
    case 'education':
      return validateEducationProp(prop, propFieldName);
    case 'hobbies':
      return validateHobbiesProp(prop);
    case 'knowledge':
      return validateKnowledgeProp(prop, propFieldName);
  }

  throw new Error(
    'user details: validate prop: unknown property "' +
      userDetailsFieldName +
      '"'
  );
}

function validateExperienceProp(prop, fieldName) {
  switch (fieldName) {
    case 'company':
    case 'position': {
      const error = validateTextLength(prop[fieldName], 100);
      return error;
    }
    case 'start': {
      return validateStart(prop.start, prop.end);
    }
    case 'end': {
      return validateEnd(prop.start, prop.end);
    }
  }

  throw new Error(
    'user details: validate experience: unknown property "' + fieldName + '"'
  );
}

function validateEducationProp(prop, fieldName) {
  switch (fieldName) {
    case 'school':
    case 'field': {
      const error = validateTextLength(prop[fieldName], 100);
      return error;
    }
    case 'start':
      return validateStart(prop.start, prop.end);
    case 'end':
      return validateEnd(prop.start, prop.end);
  }

  throw new Error(
    'user details: validate education: unknown property "' + fieldName + '"'
  );
}

function validateHobbiesProp(prop) {
  const error = validateTextLength(prop, 250);
  return error;
}

function validateKnowledgeProp(prop, fieldName) {
  switch (fieldName) {
    case 'name':
      const error = validateTextLength(prop, 250);
      return error;
    case 'lv':
      return null;
  }

  throw new Error(
    'user details: validate knowledge: unknown property "' + fieldName + '"'
  );
}

function validateTextLength(val, maxLength) {
  const valLen = val.trim().length;
  if (valLen === 0) {
    return getError('e1000');
  }

  if (valLen > maxLength) {
    return getError('e1100', maxLength);
  }

  return null;
}

function validateStart(startVal, endVal) {
  if (!startVal) {
    return getError('e1000');
  }

  const start = new Date(startVal);
  const end = new Date(endVal);

  if (isAfter(end, start)) {
    return getError('e1201', ['Period', start.toLocaleDateString()]);
  }

  if (isAfter(end, new Date().setHours(0, 0, 0, 0))) {
    return getError('e1203', ['period end date', 'today']);
  }

  return null;
}

function validateEnd(startVal, endVal) {
  if (endVal === 'current') {
    return null;
  }

  if (!endVal) {
    return getError('e1000');
  }

  const start = new Date(startVal);
  const end = new Date(endVal);

  if (isAfter(start, end)) {
    return getError('e1201', ['Period', start.toLocaleDateString()]);
  }

  if (isAfter(end, new Date().setHours(0, 0, 0, 0))) {
    return getError('e1203', ['period end date', 'today']);
  }

  return null;
}
