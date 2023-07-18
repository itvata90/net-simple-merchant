export const getFormatDate = (_date: Date | string, format = 'MM/dd/yyyy') => {
  let date = _date;
  if (typeof date === 'string') {
    date = new Date(date || '1990-01-01');
  }
  date = date ?? new Date(1990, 1, 1);

  if (date.toString() === 'Invalid Date') {
    date = new Date();
  }

  let mm = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let yyyy = date.getFullYear();
  let newDate = format;

  newDate = newDate.replace(/MM/g, String(mm)).replace(/dd/g, String(dd)).replaceAll(/yyyy/g, String(yyyy));

  return newDate;
};
