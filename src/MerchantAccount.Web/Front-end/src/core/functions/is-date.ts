export const isDate = (date: any) => {
  let isValidDate = Date.parse(date);
  let result = isNaN(isValidDate) ? false : true;
  return result;
};
