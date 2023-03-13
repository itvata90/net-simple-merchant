export const filterObjectArrayWithOneQuery = (
  array: Array<{ [key: string | number | symbol]: any }>,
  field: 'all' | string | Array<string>,
  query?: any,
) => {
  if (typeof query === 'undefined' || query === '') {
    return array;
  }
  let filtered = [];

  switch (typeof field) {
    case 'string':
      const regex = new RegExp(query, 'i');
      filtered =
        field === 'all'
          ? array.filter((item: any) => Object.values(item).some((itemField: any) => regex.test(itemField)))
          : array.filter((i) => i[field] === query);
      break;
    default: {
      filtered = array;
    }
  }
  return filtered;
};

type FilterObject = {
  [key: string]: any;
};

export const filterObjectArrayByFilterObject = <T extends { [key: string]: any }>(
  array: Array<T>,
  filterObject: FilterObject,
  stringType: 'exact' | 'include' = 'exact',
  caseInsensitive: boolean = false,
) => {
  const compareFunc = {
    string: (a: string, b: string, type: 'include' | 'exact' = 'exact', caseInsensitive = true) => {
      if (b === '') {
        return true;
      }
      if (caseInsensitive) {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      return type === 'exact' ? a === b : a.includes(b);
    },
    date: (a: Date, b: Date) => {
      return a.getTime() === b.getTime();
    },
    default: (a: unknown, b: unknown) => a === b,
  };

  return array.filter((row) =>
    Object.entries(filterObject).every(([field, keyword]) =>
      typeof row[field] === 'string'
        ? compareFunc['string'](row[field], keyword, stringType, caseInsensitive)
        : keyword instanceof Date
        ? compareFunc['date'](row[field], keyword)
        : compareFunc['default'](row[field], keyword),
    ),
  );
};
