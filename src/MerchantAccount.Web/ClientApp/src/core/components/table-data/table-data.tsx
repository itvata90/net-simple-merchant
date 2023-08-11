import { useState, useEffect, ReactNode, useId, memo, useMemo } from 'react';
import classes from './table-data.module.scss';
import classNames from 'classnames';
import { Column, SortAction, TableBaseProps } from 'src/core/interfaces/components';
import Spinner from 'src/core/components/spinner/spinner';

import { filterObjectArrayByFilterObject, filterObjectArrayWithOneQuery } from 'src/core/functions/filter-object-array';
import { sortMultipleFields, SortObject } from 'src/core/functions/sort-multiple-fields';
import TableContainer from 'src/core/components/table-container/table-container';
import TableSearchHeader from 'src/core/components/table-search-header/table-search-header';
import Table from 'src/core/components/table/table';
import TableRow from 'src/core/components/table-row/table-row';
import { TableFilterButton, TableSortButton } from 'src/core/components/table-header-button/table-header-button';
import TableCell from 'src/core/components/table-cell/table-cell';
import TableCellInlineEdit from 'src/core/components/table-cell-inline-edit/table-cell-inline-edit';
import useTableHeight from 'src/core/components/table-data/use-table-height';
import TablePaginationFooter from 'src/core/components/table-pagination-footer/table-pagination-footer';
import { OptionProperties } from 'src/core/components/form-select/form-select';

export interface TableDataProps extends TableBaseProps {
  columns: Column[];
  rows: Array<{ [key: string | symbol | number]: any }>;
  error?: string;
  loading?: boolean;
  indexField: string;
  onRowClick?: (id: string) => () => void;
  onRowDelete?: (id: string) => void;
  onSortChange?: (field: string | symbol | number, sortAction: SortAction) => void;
  onSearch?: (field: string, keyword: string) => void;
  onPageChange?: (page: string | number) => void;
  afterPageChange?: (page: string | number) => void;
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
  currentPage?: number;
  renderHeader?: (
    data: unknown[],
    searchOnChange?: boolean,
    fields?: string[],
    onSearch?: (field: string, keyword: string) => void,
  ) => ReactNode;
  renderFooter?: (page: number, count: number, limit: number) => ReactNode;
  filterOnChange?: boolean;
  multipleSelect?: boolean;
  onSelectedChange?: (selected: unknown[]) => void;
  onCellChange?: (value: unknown) => void;
  onFilterChange?: (field: string, keyword: string | Date | number | boolean | Array<OptionProperties>) => void;
  pinOnTop?: (row: { [key: string | symbol | number]: any }) => boolean;
}

export type Query = {
  field: 'all' | string | Array<string>;
  keyword: string;
};

const TableData = memo(
  ({
    className,
    loading,
    indexField,
    columns,
    rows,
    onSortChange,
    onSearch,
    onPageChange,
    afterPageChange,
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
    currentPage = 1,
    renderHeader,
    renderFooter,
    filterOnChange = false,
    multipleSelect = false,
    style,
    onSelectedChange,
    onCellChange,
    onFilterChange,
    pinOnTop,
    ...props
  }: TableDataProps) => {
    const [page, setPage] = useState<number>(currentPage);
    const [limit, setLimit] = useState(pageLimits[0]);
    const [query, setQuery] = useState<{
      field: 'all' | string | Array<string>;
      keyword: any;
    }>({
      field: 'all',
      keyword: '',
    });

    useEffect(() => {
      setPage(currentPage);
    }, [currentPage]);

    const [filters, setFilters] = useState<{
      [key: string | symbol | number]: any;
    }>({});
    const [sortObjects, setSortObjects] = useState<Array<SortObject>>([]);
    const [selected, setSelected] = useState<Array<unknown | any>>([]);

    // This data's used for showing and inline editing;
    const [showingData, setShowingData] = useState<Array<any>>([]);
    useEffect(() => {
      !!rows && rows.length > 0 && setShowingData((prev) => (prev === rows ? prev : [...rows]));
    }, [rows]);

    const searched = onSearch ? showingData : filterObjectArrayWithOneQuery(showingData, query.field, query.keyword);

    const filtered = onFilterChange ? searched : filterObjectArrayByFilterObject(searched, filters);
    const sorted = onSortChange ? filtered : sortMultipleFields(filtered, sortObjects);

    let data = onPageChange ? sorted : sorted.slice((page - 1) * limit, page * limit);

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
        if (sortObjects[0] && sortObjects[0].field !== field) {
          onSortChange && sortObjects[0] && onSortChange(sortObjects[0].field, 'none');
        } else {
          onSortChange && onSortChange(field, action);
        }
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
      onSortChange && onSortChange(field, action);
      newSortObjects[index] = { action, field };
      setSortObjects(newSortObjects);
    };

    const handlePageChange = (page: number | string) => {
      setPage(+page);
      onPageChange && onPageChange(page);
      afterPageChange && afterPageChange(page);
    };

    const handleLimitChange = (limit: number | string) => {
      setPage(1);
      setLimit(+limit);
      onLimitChange && onLimitChange(limit);
    };

    onSearch =
      onSearch ??
      ((field: string, keyword: string) => {
        setPage((prev) => (prev === 1 ? prev : 1));

        switch (typeof rows?.[0]?.[field]) {
          case 'boolean':
            setQuery({ field, keyword: Boolean(keyword) });
            break;
          case 'number':
            setQuery({ field, keyword: Number(keyword) });
            break;
          // case 'object':
          //   if (rows?.[0]?.[field] instanceof Date) {
          //     setQuery({ field, keyword: new Date(keyword) });
          //   }
          //   break;
          default:
            setQuery({ field, keyword });
        }
      });

    onFilterChange =
      onFilterChange ??
      ((field: string, keyword: string | Date | number | boolean | Array<OptionProperties>) => {
        setPage((prev) => (prev === 1 ? prev : 1));
        setFilters((prev) => {
          let newFilters = prev;
          if (keyword === '') {
            newFilters = { ...prev };
            delete newFilters[field];
          } else {
            newFilters = { ...prev, [field]: keyword };
          }

          return newFilters;
        });
      });

    useEffect(() => {
      onSelectedChange && onSelectedChange(selected);
    }, [selected]);

    const handleSetSelected = (row: unknown | any) => {
      setSelected((prev) => {
        if (!multipleSelect) {
          return [row];
        }
        const index = prev.findIndex((i) => i[indexField] === row[indexField]);
        if (index < 0) {
          return [...prev, row];
        }

        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    };

    const { tableRowHeight, tableHeadHeight, tableRef } = useTableHeight(data.length);

    const tableMinHeight = useMemo(
      () => tableRowHeight * limit + tableHeadHeight,
      [tableRowHeight, tableHeadHeight, limit],
    );

    if (!!pinOnTop) {
      let pinned = data.filter((row: any) => pinOnTop?.(row));
      const rest = data.filter((row: any) => !pinOnTop?.(row));
      if (pinned.length < 1) {
        pinned = rows.filter((row: any) => pinOnTop(row));
      }
      data = [...pinned, ...rest];
    }

    return (
      <TableContainer>
        {renderHeader ? (
          renderHeader(data, searchOnChange, searchableFields, onSearch)
        ) : (
          <TableSearchHeader searchOnChange={searchOnChange} fields={searchableFields} onSearch={onSearch} />
        )}

        <div className="position-relative overflow-auto">
          <Table
            {...props}
            ref={tableRef}
            style={{
              minHeight: fixedNumberRows
                ? rows.length <= 0
                  ? 55 * limit
                  : tableMinHeight
                : rows.length <= 0
                ? 55 * limit
                : 0,
              ...style,
            }}
            striped={striped}
            responsive={responsive}
            hover={hover}
            bordered={bordered}
            borderColor={borderColor}
            className={className}
          >
            <thead>
              <TableRow
                verticalAlign={headerVerticalAlign}
                horizonAlign={headerHorizontalAlign}
                className="position-relative"
              >
                {columns.map((column) => (
                  <th
                    key={column.field}
                    style={{
                      width: `${column.colWidth}`,
                      whiteSpace: 'nowrap',
                      verticalAlign: 'middle',
                      position: column.sticky ? 'sticky' : 'static',
                      right: 0,
                      top: 0,
                      background: column.sticky ? 'white' : 'inherit',
                    }}
                  >
                    <span style={{ verticalAlign: 'middle' }}>{column.name}</span>
                    {column.sortable ? (
                      <TableSortButton
                        value={sortObjects.find((elm) => elm.field === column.field)?.action}
                        color={color}
                        onChangeSort={handleSortChange(column.field)}
                      />
                    ) : (
                      <span style={{ visibility: 'hidden' }}>
                        <TableSortButton />
                      </span>
                    )}
                    {column.filterable ? (
                      <TableFilterButton
                        type={column.type}
                        onFilterChange={(keyword) => onFilterChange && onFilterChange(column.field, keyword)}
                        color={color}
                        filterOnChange={filterOnChange}
                        filterOptions={column?.filterOptions ?? []}
                      />
                    ) : null}
                  </th>
                ))}
              </TableRow>
            </thead>

            <tbody>
              {data.map((row: any, rowIndex: number) => (
                <TableRow
                  key={row[indexField]}
                  {...{
                    onClick: selectable ? () => handleSetSelected(row) : undefined,
                  }}
                  style={{
                    height: 0,
                    lineHeight: 0,
                  }}
                  verticalAlign={verticalAlign}
                  horizonAlign={horizontalAlign}
                  className={classNames(selected.includes(row) && 'table-active', 'position-relative')}
                >
                  {columns.map((column: Column) =>
                    column?.renderFunction ? (
                      <TableCell
                        key={column.field}
                        style={{
                          position: column.sticky ? 'sticky' : 'static',
                          right: 0,
                          top: 0,
                          background: column.sticky ? 'white' : 'inherit',
                          // boxShadow: column.sticky
                          //   ? 'inset 1px 0 1px 0 #ccc'
                          //   : 'none',
                        }}
                        className={classNames(rowIndex === data.length - 1 && 'border-bottom-0')}
                      >
                        {column.renderFunction(row)}
                      </TableCell>
                    ) : (
                      <TableCellInlineEdit
                        key={column.field}
                        column={column}
                        onCellChange={(cellValue) => handleCellChange(rowIndex, column.field, cellValue)}
                        type={column.type}
                        inlineEditing={inlineEditing}
                        style={{
                          position: column.sticky ? 'sticky' : 'static',
                          right: 0,
                          top: 0,
                          background: column.sticky ? 'white' : 'inherit',
                        }}
                        className={classNames(rowIndex === data.length - 1 && 'border-bottom-0')}
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
        </div>
        {loading && (
          <div className={classes['loader']}>
            <Spinner color="primary" />
          </div>
        )}
        {rows.length <= 0 && !loading && <div className={classes['loader']}>No rows</div>}
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
  },
);

export default TableData;
