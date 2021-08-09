import { format } from 'date-fns';
import { validateUserDetailProp } from '../validation/userDetailsValidation';

export function createFormValues(userDetails, fieldInfo) {
  let form = null;
  let isNew = false;
  let formErrors = null;
  let formTouches = false;

  if (fieldInfo !== null) {
    if (fieldInfo.idx === -1) {
      isNew = true;
      form = crateEmptyForm(fieldInfo.fieldName);
    } else {
      form = createFormWithValues(
        userDetails[fieldInfo.fieldName][fieldInfo.idx]
      );
    }

    if (fieldInfo.isSimpleValue) {
      form = { simpleValue: form };
    }

    formErrors = {};
    formTouches = {};
    for (const key in form) {
      formErrors[key] = isNew
        ? null
        : validateUserDetailProp(form, fieldInfo.fieldName, key);
      formTouches[key] = !isNew;
    }
  }

  return {
    form,
    formErrors,
    formTouches
  };
}

function createFormWithValues(fieldValue) {
  switch (typeof fieldValue) {
    case 'number':
      return Number(fieldValue);

    case 'boolean':
      return Boolean(fieldValue);
    case 'object':
      if (Array.isArray(fieldValue)) {
        const out = Array(fieldValue.length);
        for (let i = 0; i < fieldValue.length; i++) {
          const element = createFormWithValues(fieldValue[i]);

          out[i] = element;
        }

        return out;
      }

      if (fieldValue instanceof Date) {
        return format(fieldValue, 'yyyy-MM-dd');
      }

      if (fieldValue === null) {
        return null;
      }

      const out = {};

      for (const key in fieldValue) {
        const element = createFormWithValues(fieldValue[key]);
        out[key] = element;
      }

      return out;
    case 'string':
      return String(fieldValue);

    case 'undefined':
      return undefined;
  }

  throw new Error('user details: create form values: unsupported data type');
}

function crateEmptyForm(fieldName) {
  switch (fieldName) {
    case 'experience':
      return {
        company: '',
        position: '',
        start: '',
        end: ''
      };
    case 'education':
      return {
        school: '',
        field: '',
        start: '',
        end: ''
      };
    case 'knowledge':
      return {
        name: '',
        lv: ''
      };

    case 'hobbies':
      return '';
  }

  throw new Error('user details: create empty form: unknown property');
}
