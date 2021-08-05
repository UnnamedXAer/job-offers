import { format } from 'date-fns';

export function createFormValues(fieldValue) {
  switch (typeof fieldValue) {
    case 'number':
      return Number(fieldValue);

    case 'boolean':
      return Boolean(fieldValue);
    case 'object':
      if (Array.isArray(fieldValue)) {
        const out = Array(fieldValue.length);
        for (let i = 0; i < fieldValue.length; i++) {
          const element = createFormValues(fieldValue[i]);

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
        const element = createFormValues(fieldValue[key]);
        out[key] = element;
      }

      return out;
    case 'string':
      return String(fieldValue);

    case 'undefined':
      return undefined;
  }

  throw new Error('createFormValues: unsupported data type');
}

export function getEmptyFormValues(fieldName) {
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
}
