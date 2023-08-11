import { addZeroToString } from 'src/core/functions/add-zero-to-string';
import { getFormatDate } from 'src/core/functions/get-format-date';
import { Column } from 'src/core/interfaces/components';

export const handleColumnType = (cell: string, column: Column) => {
  switch (column.type) {
    case 'date':
      let dateResult = getFormatDate(cell, column.dateFormat);
      return dateResult;
    case 'datetime':
      let datetimeResult = getFormatDate(cell, column.dateFormat);
      return datetimeResult;
    case 'integer':
      let intResult = cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return intResult;
    case 'decimal':
      let limit = column.decimalLimit ? column.decimalLimit : 2;

      let val =
        Math.round(Number(cell) * Math.pow(10, limit)) / Math.pow(10, limit);

      let parts = val.toString().split('.');

      !parts[1]
        ? (parts[1] = '0'.repeat(limit))
        : (parts[1] = addZeroToString(parts[1], limit));

      let result =
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        (parts[1] ? '.' + parts[1] : '');

      return result;

    default:
      return cell;
  }
};
