import { SortAction } from 'src/core/interfaces/components';

export type SortObject = {
  action: SortAction;
  field: string | number | symbol;
};

export const sortMultipleFields = (
  array: Array<unknown>,
  sortObjects: Array<SortObject>
) => {
  const sorted = [...array];

  sorted.sort((a: any, b: any) =>
    sortObjects.reduce(
      (acc, sortBy) =>
        acc ||
        (sortBy.action === 'desc' ? -1 : 1) *
          (typeof a[sortBy.field] === 'number'
            ? a[sortBy.field] - b[sortBy.field]
            : a[sortBy.field] instanceof Date && b[sortBy.field] instanceof Date
            ? a[sortBy.field] - b[sortBy.field]
            : JSON.stringify(a[sortBy.field] ?? '').localeCompare(
                JSON.stringify(b[sortBy.field] ?? '')
              )),
      0
    )
  );
  return sorted;
};
