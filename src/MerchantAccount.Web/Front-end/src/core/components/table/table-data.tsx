import { useState, useEffect, ReactNode, useRef, LegacyRef, useLayoutEffect, useId } from 'react';
import classes from './table.module.scss';
import classNames from 'classnames';
import { Column, SortAction, TableBaseProps } from 'src/core/interfaces/components';
import Spinner from 'src/core/components/spinner/spinner';
import TableContainer from 'src/core/components/table/table-container/table-container';
import Table from 'src/core/components/table/table/table';
import TableRow from 'src/core/components/table/table-row/table-row';
import TablePaginationFooter from 'src/core/components/table/table-pagination-footer/table-pagination-footer';
import TableSearchHeader from 'src/core/components/table/table-search-header/table-search-header';
import { filterObjectArrayByFilterObject, filterObjectArrayWithOneQuery } from 'src/core/functions/filter-object-array';
import { sortMultipleFields, SortObject } from 'src/core/functions/sort-multiple-fields';
import TableCell from 'src/core/components/table/table-cell/table-cell';
import { TableFilterButton, TableSortButton } from 'src/core/components/table/table-header-button/table-header-button';
import useTableCellHeight from 'src/core/components/table/use-table-height';
import TableCellInlineEdit from 'src/core/components/table/table-cell-inline-edit/table-cell-inline-edit';

export interface TableDataProps extends TableBaseProps {
  columns: Column[];
  rows: Array<{ [key: string | symbol | number]: any }>;
  error?: string;
  loading?: boolean;
  indexField: string;
  onRowClick?: (id: string) => () => void;
  onRowDelete?: (id: string) => void;
  onSortChange?: (field: string | symbol | number, sortAction: SortAction) => () => void;
  onSearch?: (field: string, keyword: string) => void;
  onPageChange?: (page: string | number) => void;
  onLimitChange?: (limit: string | number) => void;
  fixedNumberRows?: boolean;
  tableProps?: { [key: string]: any };
  pageLimits?: number[];
  searchable?: boolean;
  multipleSort?: boolean;
  inlineEditing?: boolean;
  selectable?: boolean;
  responsive?: boolean;
  horizontalAlign?: 'center' | 'start' | 'end';
  verticalAlign?: 'top' | 'bottom' | 'middle';
  headerHorizontalAlign?: 'center' | 'start' | 'end';
  headerVerticalAlign?: 'top' | 'bottom' | 'middle';
  searchOnChange?: boolean;
  pageCount?: number;
  renderHeader?: (data: unknown[]) => ReactNode;
  renderFooter?: (page: number, count: number, limit: number) => ReactNode;
  filterOnChange?: boolean;
  multipleSelect?: boolean;
  onSelectedChange?: (selected: unknown[]) => void;
  onCellChange?: (value: unknown) => void;
  onFilterChange?: (field: string, keyword: string | Date | number | boolean) => void;
}

export type Query = {
  field: 'all' | string | Array<string>;
  keyword: string;
};

const TableData = ({
  className,
  loading,
  indexField,
  columns,
  rows,
  onSortChange,
  onSearch,
  onPageChange,
  onLimitChange,
  fixedNumberRows = false,
  error,
  color,
  striped,
  hover,
  selectable = false,
  bordered,
  borderColor,
  responsive,
  horizontalAlign,
  verticalAlign,
  headerHorizontalAlign,
  headerVerticalAlign,
  searchOnChange,
  multipleSort,
  inlineEditing = true,
  pageLimits = [1, 2, 3],
  pageCount,
  renderHeader,
  renderFooter,
  filterOnChange = false,
  multipleSelect = false,
  style,
  onSelectedChange,
  onCellChange,
  onFilterChange,
  ...props
}: TableDataProps) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(pageLimits[0]);
  const [query, setQuery] = useState<{ field: 'all' | string | Array<string>; keyword: any }>({
    field: 'all',
    keyword: '',
  });
  const [filters, setFilters] = useState<{ [key: string | symbol | number]: any }>({});
  const [sortObjects, setSortObjects] = useState<Array<SortObject>>([]);
  const [selected, setSelected] = useState<Array<unknown | any>>([]);

  // This data's used for showing and inline editing;
  const [showingData, setShowingData] = useState<Array<any>>([]);

  useEffect(() => {
    setShowingData([...rows]);
  }, [rows]);

  const searched = filterObjectArrayWithOneQuery(showingData, query.field, query.keyword);
  const filtered = filterObjectArrayByFilterObject(searched, filters);
  const sorted = sortMultipleFields(filtered, sortObjects);
  const data = onPageChange ? sorted : sorted.slice((page - 1) * limit, page * limit);

  pageCount = pageCount ?? Math.ceil(filtered.length / limit);
  const searchableFields = columns.filter((col) => col.searchable).map((col) => col.field);
  searchableFields.unshift('all');

  const handleCellChange = (rowIndex: number, field: string, value: unknown) => {
    const newData = [...showingData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: value,
    };
    onCellChange && onCellChange(newData);
    setShowingData(newData);
  };

  const handleSortChange = (field: string | symbol | number) => (action: SortAction) => {
    if (!multipleSort) {
      return setSortObjects(() => [{ action, field }]);
    }

    const index = sortObjects.findIndex((elm) => elm.field === field);

    if (!index) {
      return setSortObjects((prev) => [...prev, { action, field }]);
    }

    if (action === 'none') {
      setSortObjects((prev) => [...prev.filter((elm) => elm.field !== field)]);
    }

    let newSortObjects = [...sortObjects];
    newSortObjects[index] = { action, field };
    onSortChange && onSortChange(field, action);
    setSortObjects(newSortObjects);
  };

  const handlePageChange = (page: number | string) => {
    setPage(+page);
    onPageChange && onPageChange(page);
  };

  const handleLimitChange = (limit: number | string) => {
    setPage(1);
    setLimit(+limit);
    onLimitChange && onLimitChange(limit);
  };

  onSearch =
    onSearch ??
    ((field: string, keyword: string) => {
      switch (typeof rows?.[0]?.[field]) {
        case 'boolean':
          setQuery({ field, keyword: Boolean(keyword) });
          break;
        case 'number':
          setQuery({ field, keyword: Number(keyword) });
          break;
        case 'object':
          if (rows?.[0]?.[field] instanceof Date) {
            setQuery({ field, keyword: new Date(keyword) });
          }
          break;
        default:
          setQuery({ field, keyword });
      }
    });

  onFilterChange =
    onFilterChange ??
    ((field: string, keyword: string | Date | number | boolean) => {
      setFilters((prev) => ({ ...prev, [field]: keyword }));
    });

  const handleSetSelected = (row: unknown | any) => {
    setSelected((prev) => {
      if (!multipleSelect) {
        onSelectedChange && onSelectedChange([row]);
        return [row];
      }
      const index = prev.findIndex((i) => i[indexField] === row[indexField]);

      if (index < 0) {
        onSelectedChange && onSelectedChange([...prev, row]);
        return [...prev, row];
      }
      onSelectedChange && onSelectedChange([...prev.slice(0, index), ...prev.slice(index + 1)]);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  const { tableRowHeight, tableHeadHeight, tableRef } = useTableCellHeight(data.length);

  const tableMinHeight = tableRowHeight * limit + tableHeadHeight;

  return (
    <TableContainer>
      {renderHeader ? (
        renderHeader(data)
      ) : (
        <TableSearchHeader searchOnChange={searchOnChange} fields={searchableFields} onSearch={onSearch} />
      )}

      <Table
        {...props}
        ref={tableRef}
        style={{ minHeight: fixedNumberRows ? tableMinHeight : 0, ...style }}
        striped={striped}
        responsive={responsive}
        hover={hover}
        bordered={bordered}
        borderColor={borderColor}
        className={className}
      >
        <thead>
          <TableRow verticalAlign={headerVerticalAlign} horizonAlign={headerHorizontalAlign}>
            {columns.map((column) => (
              <th key={column.field} style={{ width: `${column.colWidth}`, whiteSpace: 'nowrap' }}>
                {column.name}
                {column.sortable ? (
                  <TableSortButton
                    value={sortObjects.find((elm) => elm.field === column.field)?.action}
                    color={color}
                    onChangeSort={handleSortChange(column.field)}
                  />
                ) : null}
                {column.filterable ? (
                  <TableFilterButton
                    type={column.type}
                    onFilterChange={(keyword) => onFilterChange && onFilterChange(column.field, keyword)}
                    color={color}
                    filterOnChange={filterOnChange}
                  />
                ) : null}
              </th>
            ))}
          </TableRow>
        </thead>

        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <TableRow
              key={row[indexField] + rowIndex}
              {...{ onClick: selectable ? () => handleSetSelected(row[indexField]) : undefined }}
              style={{
                height: 0,
                lineHeight: 0,
              }}
              verticalAlign={verticalAlign}
              horizonAlign={horizontalAlign}
              className={classNames(selected.includes(row[indexField]) && 'table-active')}
            >
              {columns.map((column: Column) =>
                column?.renderFunction ? (
                  <TableCell key={column.field}>{column.renderFunction(row)}</TableCell>
                ) : (
                  <TableCellInlineEdit
                    key={column.field}
                    column={column}
                    onCellChange={(cellValue) => handleCellChange(rowIndex, column.field, cellValue)}
                    type={column.type}
                    inlineEditing={inlineEditing}
                  >
                    {row[column.field]}
                  </TableCellInlineEdit>
                ),
              )}
            </TableRow>
          ))}
          <tr
            key={useId()}
            style={{
              height: 0,
              border: 0,
            }}
          ></tr>
        </tbody>
      </Table>
      {loading && (
        <div className={classes['loader']}>
          <Spinner color="primary" />
        </div>
      )}
      {rows.length <= 0 && !loading && <div className={classes['loader']}></div>}
      {error && !loading && <div className={classes['loader']}></div>}
      {renderFooter ? (
        renderFooter(page, pageCount, limit)
      ) : (
        <TablePaginationFooter
          limits={pageLimits}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          count={pageCount}
          page={page}
        />
      )}
    </TableContainer>
  );
};

export default TableData;
