const monthsEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysEn = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getFormatDate = (_date: Date | string, format = 'MM/dd/yyyy') => {
  let date = _date;
  if (typeof date === 'string') {
    date = new Date(date || '1990-01-01');
  }
  date = date ?? new Date(1990, 1, 1);

  if (date.toString() === 'Invalid Date') {
    date = new Date();
  }

  let mm =
    date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let yyyy = date.getFullYear();
  let ee = '0' + (date.getDay() + 1);
  let newDate = format;

  // Month
  const isLongMonth = (format.match(/MMMM/g) ?? []).length > 0;
  const isMediumMonth = (format.match(/MMM/g) ?? []).length > 0;

  if (isLongMonth) {
    newDate = newDate.replace(/MMMM/g, monthsEn[date.getMonth()]);
  } else if (isMediumMonth) {
    newDate = newDate.replace(/MMM/g, monthsEn[date.getMonth()]?.slice(0, 3));
  } else {
    newDate = newDate.replace(/MM/g, String(mm));
  }

  // Day
  const isLongDay = (format.match(/EEEE/g) ?? []).length > 0;
  const isMediumDay = (format.match(/EEE/g) ?? []).length > 0;

  if (isLongDay) {
    newDate = newDate.replace(/EEEE/g, daysEn[date.getMonth() - 1]);
  } else if (isMediumDay) {
    newDate = newDate.replace(/EEE/g, daysEn[date.getMonth() - 1].slice(0, 3));
  } else {
    newDate = newDate.replace(/EE/g, String(ee));
  }

  newDate = newDate
    .replace(/dd/g, String(dd))
    .replaceAll(/yyyy/g, String(yyyy));

  return newDate;
};
