import formatFns from 'date-fns/format';

export const format = val => {
  if (val instanceof Date) {
    return formatFns(val, 'yyyy-MM-dd');
  }

  return val;
};
