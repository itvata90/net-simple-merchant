import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  horizonAlign?: 'center' | 'start' | 'end';
  verticalAlign?: 'top' | 'bottom' | 'middle';
  searchOnChange?: boolean;
}

const TableRow = ({ verticalAlign, horizonAlign, children, className, onClick, ...props }: TableRowProps) => {
  return (
    <tr
      {...props}
      onClick={onClick}
      className={classNames(
        horizonAlign && `text-${horizonAlign}`,
        verticalAlign && `align-${verticalAlign}`,
        className,
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
