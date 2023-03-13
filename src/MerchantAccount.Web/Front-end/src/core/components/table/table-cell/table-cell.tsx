import { HTMLAttributes, ReactNode, useState } from 'react';
import Form from 'src/core/components/form/form';
import { handleColumnType } from 'src/core/functions/handle-column-type';
import { Column, DataType } from 'src/core/interfaces/components';
import { getFormatDate } from 'src/core/functions/get-format-date';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {}

const TableCell = ({ children, ...props }: TableCellProps) => {
  return <td {...props}>{children}</td>;
};

export default TableCell;
