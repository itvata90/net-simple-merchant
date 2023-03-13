export const addZeroToString = (str: string, length: number) => {
  let result = str;
  if (str.length != length) {
    for (let i = 0; i < length - str.length; i++) {
      result += '0';
    }
  }
  return result;
};
