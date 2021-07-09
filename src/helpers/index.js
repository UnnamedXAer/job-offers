export const setTouchedAll = touched => {
  for (const key in touched) {
    if (typeof touched[key] === 'object') {
      setTouchedAll(touched[key]);
      continue;
    }
    touched[key] = true;
  }
};

export const checkNullAll = obj => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      return false;
    }
    if (
      obj[key] !== null &&
      typeof obj[key] === 'object' &&
      !checkNullAll(obj[key])
    ) {
      return false;
    }
  }
  return true;
};

export const setDataToVueDataProp = (vueDataProp, data) => {
  for (const prop in data) {
    if (Array.isArray(data[prop])) {
      vueDataProp[prop].push(...data[prop]);
      continue;
    }

    if (typeof data[prop] === 'object') {
      setDataToVueDataProp(vueDataProp[prop], data[prop]);
      continue;
    }

    vueDataProp[prop] = data[prop];
  }
};
