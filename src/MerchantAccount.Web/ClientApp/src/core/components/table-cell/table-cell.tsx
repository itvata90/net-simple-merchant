import { HTMLAttributes } from 'react';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {}

const TableCell = ({ children, ...props }: TableCellProps) => {
  return <td {...props}>{children}</td>;
};

export default TableCell;
