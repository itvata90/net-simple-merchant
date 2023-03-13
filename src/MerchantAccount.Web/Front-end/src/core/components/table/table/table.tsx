import classNames from 'classnames';
import React, { forwardRef, LegacyRef, useRef } from 'react';
import { TableBaseProps } from 'src/core/interfaces/components';

export interface TableProps extends TableBaseProps {}
const Table = forwardRef<HTMLTableElement, TableBaseProps>(
  ({ className, color, striped, hover, bordered, borderColor, responsive, children, ...otherProps }, ref) => {
    let bsPrefix = 'table';

    let tableColorClassName = bsPrefix;
    tableColorClassName += color ? '-' + color : '';

    let tableBorderColorClassName = 'border';
    tableBorderColorClassName += borderColor ? '-' + borderColor : '';

    return (
      <table
        {...otherProps}
        ref={ref}
        aria-label="table"
        className={classNames(
          bsPrefix,
          className,
          color && tableColorClassName,
          striped === 'row'
            ? `${bsPrefix}-striped`
            : striped === 'col'
            ? `${bsPrefix}-striped-columns`
            : striped === 'both'
            ? `${bsPrefix}-striped ${bsPrefix}-striped-columns`
            : undefined,
          hover && `${bsPrefix}-hover`,
          bordered && `${bsPrefix}-bordered ` + tableBorderColorClassName,
          true && `${bsPrefix}-responsive`,
          'mb-0',
        )}
      >
        {children}
      </table>
    );
  },
);

export default Table;
