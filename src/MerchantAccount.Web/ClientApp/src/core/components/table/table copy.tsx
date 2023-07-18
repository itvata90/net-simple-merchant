import { BsSortUpAlt, BsSortDown, BsArrowDownUp, BsSearch, BsTrash2, BsFunnel } from 'react-icons/bs';

import React, { useState, useEffect } from 'react';
import classes from './Table.module.scss';
import classNames from 'classnames';
import { TableBaseProps, TableBaseProps2 } from 'src/core/interfaces/components';
import Card from 'src/core/components/card/card';
import InputGroup from 'src/core/components/input-group/input-group';
import FormSelect from 'src/core/components/form-select/form-select';
import FormControl from 'src/core/components/form-control/form-control';
import Button from 'src/core/components/button/button';
import Spinner from 'src/core/components/spinner/spinner';
import Pagination from 'src/core/components/pagination/pagination';
import { handleColumnType } from 'src/core/functions/handle-column-type';
import TableContainer from 'src/core/components/table/table-container/table-container';
import Table from 'src/core/components/table/table/table';
import TableBody from 'src/core/components/table/table-body/table-body';
import TableHead from 'src/core/components/table/table-head/table-head';
import TableRow from 'src/core/components/table/table-row/table-row';
import TableCell from 'src/core/components/table/table-cell/table-cell';

export interface TableProps extends TableBaseProps2 {
  error?: string;
  loading?: boolean;
  indexField: string;
  onRowClick?: (id: string) => () => void;
  onRowDelete?: (id: string) => void;
  onRemoveSortBy?: (field: string) => () => void;
  onAddSortByAsc?: (field: string) => () => void;
  onAddSortByDesc?: (field: string) => () => void;
  onSearch?: (field: string, keyword: string) => () => void;
  onPageChange?: (newPage: number, limit: number) => () => void;
  numberOfRows?: number;
  tableProps?: { [key: string]: any };
  pageLimits?: number[];
  searchable?: boolean;
  multipleSort?: boolean;
  inlineEditing?: boolean;
  selectable?: boolean;
  responsive?: boolean;
  horizonAlign?: 'center' | 'start' | 'end';
  verticalAlign?: 'top' | 'bottom' | 'middle';
  headerHorizontalAlign?: 'center' | 'start' | 'end';
  headerVerticalAlign?: 'top' | 'bottom' | 'middle';
  searchOnChange?: boolean;
}

export enum SortAction {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}
const TableData = ({
  className,
  loading,
  indexField,
  columns,
  rows,
  onRemoveSortBy,
  onAddSortByAsc,
  onAddSortByDesc,
  onSearch,
  onPageChange,
  numberOfRows = 3,
  error,
  color,
  striped,
  hover,
  selectable,
  bordered,
  borderColor,
  responsive,
  horizonAlign,
  verticalAlign,
  headerHorizontalAlign,
  headerVerticalAlign,
  searchOnChange,
  searchable,
  multipleSort,
  inlineEditing,
  pageLimits = [],
}: TableProps) => {
  const [limit, setLimit] = useState<number>(pageLimits[0]);
  const [page, setPage] = useState(1);
  const [searchableFields, setSearchableFields] = useState<string[]>([]);
  const [pageCount, setPageCount] = useState(5);
  const [data, setData] = useState(rows);
  const [sortResult, setSortResult] = useState(rows);
  const [sortField, setSortField] = useState<Set<string>>(new Set());
  const [pageResult, setPageResult] = useState([]);
  const [openSearch, setOpenSearch] = useState<string[]>([]);
  const [toggleInput, setToggleInput] = useState(false);
  const [filterKeywords, setFilterKeywords] = useState<{
    [key: string]: string;
  }>({});
  const [searchKeywords, setSearchKeywords] = useState<{
    [key: string]: string;
  }>({});
  const [sortAction, setSortAction] = useState<Array<{ field: string; action: SortAction }>>([]);
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    setData(rows);
    setSortResult(rows);
  }, [rows]);
  useEffect(() => {
    defaultSort();
  }, [sortAction]);

  const isDate = (date: any) => {
    let isValidDate = Date.parse(date);
    let result = isNaN(isValidDate) ? false : true;
    return result;
  };

  const subtractDate = (dateA: Date, dateB: Date) => {
    return (dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24);
  };

  const dateConvert = (date: string) => {
    let result = new Date(date);
    return result;
  };

  useEffect(() => {
    let temp = ['All'];
    for (let i = 0; i < columns.length; i++) {
      columns[i].searchable && temp.push(columns[i].field);
    }
    setSearchableFields(temp);
  }, [columns]);

  const defaultSort = () => {
    setSortResult(
      [...data].sort((a: any, b: any) =>
        sortAction.reduce(
          (acc, sortBy) =>
            acc ||
            (sortBy.action === SortAction.DESC ? -1 : 1) *
              (typeof a[sortBy.field] === 'number'
                ? a[sortBy.field] - b[sortBy.field]
                : isDate(a[sortBy.field]) && isDate(b[sortBy.field])
                ? subtractDate(dateConvert(a[sortBy.field]), dateConvert(b[sortBy.field]))
                : JSON.stringify(a[sortBy.field]).localeCompare(JSON.stringify(b[sortBy.field]))),
          0,
        ),
      ),
    );
  };

  const handleClickSort = (field: string, action: SortAction) => () => {
    switch (action) {
      case SortAction.NONE: {
        onAddSortByAsc ? onAddSortByAsc(field)() : defaultSortByAsc(field, action);
        break;
      }
      case SortAction.ASC: {
        onAddSortByDesc ? onAddSortByDesc(field)() : defaultSortByDesc(field, action);
        break;
      }
      case SortAction.DESC: {
        //For removing sorting of a column:
        // onRemoveSortBy
        //   ? onRemoveSortBy(field)()
        //   : defaultRemoveSortBy(field, action);

        onAddSortByAsc ? onAddSortByAsc(field)() : defaultSortByAsc(field, action);
      }
    }
  };

  const defaultSortByAsc = (field: string, action: SortAction) => {
    if (multipleSort && !sortAction.some((value) => Object.values(value).includes(field))) {
      setSortAction((prev) => [
        ...prev,
        {
          field,
          action: SortAction.ASC,
        },
      ]);
    } else {
      if (!multipleSort && !sortAction.some((value) => Object.values(value).includes(field))) {
        setSortAction([
          {
            field,
            action: SortAction.ASC,
          },
        ]);
      } else {
        let temp = sortAction;
        let index = sortAction.findIndex((value) => value.field === field);
        temp[index].action = SortAction.ASC;
        setSortAction([...temp]);
      }
    }
  };

  const defaultSortByDesc = (field: string, action: SortAction) => {
    let temp = sortAction;
    let index = sortAction.findIndex((value) => value.field === field);
    temp[index].action = SortAction.DESC;
    setSortAction([...temp]);
  };

  //For removing sort of a column:
  // const defaultRemoveSortBy = (field: string) => {
  //   let temp = sortAction;
  //   let index = sortAction.findIndex(value => value.field === field);
  //   index !== -1 && temp.splice(index, 1);
  //   setSortAction([...temp]);
  //   if (temp.length === 0) {
  //     setSortResult(data);
  //     return;
  //   }
  //   setSortField(new Set(sortField));
  // };

  const handleOpenFilter = (field: string) => () => {
    const index = openSearch.indexOf(field);
    if (index !== -1) {
      const temp = openSearch;
      temp.splice(index, 1);
      setOpenSearch([...temp]);
      return;
    }
    setOpenSearch([...openSearch, field]);
  };

  const handleSearch = (field: string, keyword: { [key: string]: string }) => () => {
    onSearch ? onSearch(field, searchKeywords[field])() : defaultSearch(keyword);
  };

  const defaultSearch = (keyword: { [key: string]: string }) => {
    const key = Object.keys(keyword);
    let result = [];

    if (key[0] === 'All') {
      const regex = new RegExp(keyword[`${key}`], 'i');
      result = rows.filter((value: any) => Object.values(value).some((cell: any) => regex.test(cell)));
    } else {
      result = rows.filter((value: any) => value[`${key}`].toLowerCase().includes(keyword[`${key}`].toLowerCase()));
    }
    setSortResult(result);
    setData(result);
  };

  const handleChangeTextFiltering = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterCol = { ...filterKeywords, [field]: event.target.value };
    setFilterKeywords(filterCol);
    searchOnChange && handleFiltering(field, filterCol)();
  };

  const handleFiltering = (field: string, keyword: { [key: string]: string }) => () => {
    onSearch ? onSearch(field, filterKeywords[field])() : defaultFiltering(keyword);
  };

  const defaultFiltering = (keyword: { [key: string]: string }) => {
    const keys = Object.keys(keyword);

    const result = rows.filter((value: any) =>
      keys.every((key) => value[key].toLowerCase().includes(keyword[key].toLowerCase())),
    );

    setSortResult(result);
    setData(result);
  };

  const clearFilterKeywords = (field: string) => () => {
    let keyword = { ...filterKeywords, [field]: '' };
    setFilterKeywords(keyword);
    onSearch ? onSearch(field, filterKeywords[field])() : defaultFiltering(keyword);
  };

  const handlePageChange = (newPage: number) => {
    onPageChange ? onPageChange(newPage, limit) : setPage(newPage);
  };

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handleSelectRow = (event: any, row: any) => {
    if (selected.includes(row)) {
      let temp = selected.filter((item) => item !== row);
      setSelected(temp);
    } else {
      setSelected((prev) => [...prev, row]);
    }
  };

  const handleToggleInput = (event: any, row: any) => {
    setToggleInput(true);
  };

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (limit === undefined) {
      setPageResult(sortResult);
    } else {
      setPageCount(Math.ceil(sortResult.length / limit));
      setPageResult(sortResult.slice((page - 1) * limit, page * limit));
    }
  }, [limit, page, sortResult, data]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow verticalAlign={headerVerticalAlign} horizonAlign={headerHorizontalAlign}>
            {columns.map((column: any) => (
              <TableCell key={column.field} style={{ width: `${column.colWidth}` }}>
                {column.name}
                {column.sortable && (
                  <Button
                    color={color}
                    className={classNames(classes.btn, 'rounded-circle m-1 p-1')}
                    onClick={handleClickSort(
                      column.field,
                      sortAction.find((value) => value.field === column.field)?.action || SortAction.NONE,
                    )}
                    size="sm"
                  >
                    {sortAction.find(
                      (value) => value['field'] === column.field && value['action'] === SortAction.ASC,
                    ) ? (
                      <BsSortUpAlt />
                    ) : sortAction.find(
                        (value) => value['field'] === column.field && value['action'] === SortAction.DESC,
                      ) ? (
                      <BsSortDown />
                    ) : (
                      <BsArrowDownUp style={{ opacity: 0.5 }} />
                    )}
                  </Button>
                )}
                {column.filterable && (
                  <>
                    <Button
                      color={color}
                      className={classNames(classes.btn, 'rounded-circle m-1 p-1')}
                      style={{
                        opacity: openSearch.includes(column.field) ? '1' : '0.5',
                      }}
                      onClick={handleOpenFilter(column.field)}
                      size="sm"
                    >
                      <BsFunnel />
                    </Button>
                    <div
                      style={{
                        position: 'relative',
                        display: openSearch.includes(column.field) ? 'block' : 'none',
                      }}
                    >
                      <InputGroup size="sm" aria-label="search-input">
                        <FormControl
                          value={filterKeywords[column.field] || ''}
                          onChange={handleChangeTextFiltering(column.field)}
                          style={{ width: column.searchWidth }}
                        />
                        <InputGroup.Text>
                          <Button
                            className={classNames(classes.btn, 'p-0 border-0')}
                            onClick={handleFiltering(column.field, filterKeywords)}
                            style={{ marginRight: '4px' }}
                          >
                            <BsFunnel />
                          </Button>
                          <div className="vr" />
                          <Button
                            className={classNames(classes.btn, 'p-0 border-0')}
                            onClick={clearFilterKeywords(column.field)}
                            style={{ marginLeft: '4px' }}
                          >
                            <BsTrash2 className="text-danger" />
                          </Button>
                        </InputGroup.Text>
                      </InputGroup>
                    </div>
                  </>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {pageResult.map((row: { [key: string]: any }) => (
            <tr
              className={classNames(
                selected.includes(row) && 'table-active',
                horizonAlign && `text-${horizonAlign}`,
                verticalAlign && `align-${verticalAlign}`,
              )}
              key={row[indexField]}
            >
              {columns.map((column: any) => {
                return inlineEditing ? (
                  column.editable && toggleInput ? (
                    <InputGroup size="sm" aria-label="search-input">
                      <FormControl
                        value={filterKeywords[column.field] || ''}
                        onChange={handleChangeTextFiltering(column.field)}
                        style={{ width: column.searchWidth }}
                      />
                      <InputGroup.Text>
                        <Button
                          className={classNames(classes.btn, 'p-0 border-0')}
                          onClick={handleFiltering(column.field, filterKeywords)}
                          style={{ marginRight: '4px' }}
                        >
                          <BsFunnel />
                        </Button>
                        <div className="vr" />
                        <Button
                          className={classNames(classes.btn, 'p-0 border-0')}
                          onClick={clearFilterKeywords(column.field)}
                          style={{ marginLeft: '4px' }}
                        >
                          <BsTrash2 className="text-danger" />
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>
                  ) : (
                    <td
                      key={column.field}
                      className={classNames(
                        column.horizonAlign && `text-${column.horizonAlign}`,
                        column.verticalAlign && `align-${column.verticalAlign}`,
                      )}
                      onClick={(event: any) => {
                        selectable && !column.nonClickable && handleSelectRow(event, row);
                      }}
                    >
                      {column.renderFunction ? (
                        column.renderFunction(row)
                      ) : (
                        <p
                          onDoubleClick={(event: any) => {
                            handleToggleInput(event, row);
                          }}
                        >
                          {handleColumnType(row, column)}
                        </p>
                      )}
                    </td>
                  )
                ) : (
                  <td
                    key={column.field}
                    className={classNames(
                      column.horizonAlign && `text-${column.horizonAlign}`,
                      column.verticalAlign && `align-${column.verticalAlign}`,
                    )}
                    onClick={(event: any) => {
                      selectable && !column.nonClickable && handleSelectRow(event, row);
                    }}
                  >
                    {column.renderFunction ? column.renderFunction(row) : handleColumnType(row, column)}
                  </td>
                );
              })}
            </tr>
          ))}
        </TableBody>
      </Table>
      {pageResult.length <= 0 && !loading && (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          No rows
        </div>
      )}
      {loading && (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Spinner color="primary" />
        </div>
      )}
      {error && !loading && (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
    </TableContainer>
  );
};

export default TableData;
{
  /* {pageLimits.length > 1 && (
        <Card.Footer style={{ justifyContent: 'flex-end', display: 'flex' }}>
          <InputGroup
            aria-label="page-limit"
            size="sm"
            style={{ width: '130px', height: '38px', marginTop: '1px' }}
            className="justify-content-end"
          >
            <FormSelect
              style={{
                borderTopLeftRadius: '0.375rem',
                borderBottomLeftRadius: '0.375rem',
              }}
              onChange={handleLimitChange}
              size="sm"
            >
              {pageLimits.map((limit: any) => (
                <option value={limit}>{limit}</option>
              ))}
            </FormSelect>
            <InputGroup.Text
              style={{
                borderTopRightRadius: '0.375rem',
                borderBottomRightRadius: '0.375rem',
              }}
            >
              /page
            </InputGroup.Text>
          </InputGroup>
          <Pagination
            aria-label="pagination"
            className="justify-content-end"
            page={page}
            onChange={handlePageChange}
            count={pageCount}
            style={{ margin: 1 }}
          />
        </Card.Footer>
      )} */
}
