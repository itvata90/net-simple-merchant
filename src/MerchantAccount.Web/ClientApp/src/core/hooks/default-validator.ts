import { ValidationError } from 'src/core/hooks/use-form';
// Default validator

export const defaultValidator = (
  values: any,
  validation: any
): { [key: string]: any } => {
  const errors: { [key: string]: ValidationError } = {};
  if (!validation) {
    return errors;
  }
  for (let [field, value] of Object.entries(values)) {
    if (!validation[field]) {
      continue;
    }
    // Check require
    if (validation[field].required) {
      let isError = false;
      if (typeof value === 'string') {
        isError = value.trim() === '';
      } else if (Array.isArray(value)) {
        isError = value.length === 0;
      } else if (typeof value === 'object') {
        isError = !value && Object.keys(value || {}).length === 0;
      } else if (typeof value === 'undefined') {
        isError = true;
      } else {
        isError = false;
      }
      errors[field] = isError ? `required` : false;
      if (isError) {
        continue;
      }
    }

    // Check email
    if (
      !!value &&
      validation[field].isEmail &&
      typeof value === 'string' &&
      !value.match(/\S+@\S+\.\S+/)
    ) {
      errors[field] = 'isEmail';
      continue;
    }

    // Check phone
    if (
      !!value &&
      validation[field].isPhone &&
      typeof value === 'string' &&
      !value.match(
        /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)/
      )
    ) {
      errors[field] = 'isPhone';
      continue;
    }

    // Check maxLength
    if (
      validation[field].maxLength &&
      (typeof value === 'string' || typeof value === 'number') &&
      String(value).length > validation[field].maxLength
    ) {
      errors[field] = `maxLength`;
      continue;
    }
    // Check min
    if (
      validation[field].min &&
      (typeof value === 'string' || typeof value === 'number') &&
      Number(value) < validation[field].min
    ) {
      errors[field] = `min`;
      continue;
    }

    // Check max
    if (
      validation[field].max &&
      (typeof value === 'string' || typeof value === 'number') &&
      Number(value) > validation[field].max
    ) {
      errors[field] = `max`;
      continue;
    }

    // Check pattern
    if (
      validation[field].pattern &&
      typeof value === 'string' &&
      !value.match(validation[field].pattern)
    ) {
      errors[field] = `pattern`;
      continue;
    }

    errors[field] = false;
  }
  return errors;
};
