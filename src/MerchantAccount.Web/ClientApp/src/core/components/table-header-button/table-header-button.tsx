import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  BsArrowDownUp,
  BsFunnel,
  BsSortDown,
  BsSortUpAlt,
  BsTrash2,
} from 'react-icons/bs';
import Button from 'src/core/components/button/button';
import Form from 'src/core/components/form/form';
import InputGroup from 'src/core/components/input-group/input-group';
import { useOutsideClick } from 'src/core/hooks/use-outside-click';
import { Color, DataType, SortAction } from 'src/core/interfaces/components';
import classes from './table-header-button.module.scss';
import { OptionProperties } from 'src/core/components/form-select/form-select';
import classNames from 'classnames';

export interface TableSortButtonProps {
  color?: Color;
  onChangeSort?: (sortAction: SortAction) => void;
  value?: SortAction;
}

export const TableSortButton = ({
  value,
  color,
  onChangeSort,
}: TableSortButtonProps) => {
  const [sortAction, setSortAction] = useState<SortAction>('none');
  useEffect(() => {
    setSortAction(value || 'none');
  }, [value]);
  const handleClickSort = () => {
    const actionChanger: { [key: string]: SortAction } = {
      none: 'asc',
      asc: 'desc',
      desc: 'none',
    };
    onChangeSort
      ? onChangeSort(actionChanger[sortAction])
      : setSortAction(actionChanger[sortAction]);
  };

  const sortIcon: { [key: string]: ReactNode } = {
    none: <BsArrowDownUp />,
    asc: <BsSortUpAlt />,
    desc: <BsSortDown />,
  };

  return (
    <Button
      color={color}
      className={classNames(
        classes['sort-button'],
        'rounded-circle p-1',
        sortAction !== 'none' && 'active',
        sortAction !== 'none' && classes['active']
      )}
      onClick={handleClickSort}
      size="sm"
    >
      {sortIcon[sortAction]}
    </Button>
  );
};

export interface TableFilterButtonProps {
  type?: DataType;
  color?: Color;
  onFilterChange?: (
    keyword: string | Date | number | boolean | Array<OptionProperties>
  ) => void;
  open?: boolean;
  filterOnChange?: boolean;
  filterOptions?: Array<OptionProperties>;
}

export const TableFilterButton = ({
  open,
  color,
  onFilterChange,
  type = 'text',
  filterOnChange = false,
  filterOptions = [],
}: TableFilterButtonProps) => {
  const [openFilter, setOpenFilter] = useState<boolean>(open ?? false);
  const [filterKeyword, setFilterKeyword] = useState<string | number>('');
  const containerRef = useRef<any>();
  useOutsideClick(containerRef, () => setOpenFilter(false));

  useEffect(() => {
    setOpenFilter(open ?? false);
  }, [open]);

  const handlerFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterKeyword(value);
    filterOnChange &&
      onFilterChange &&
      onFilterChange(
        type === 'date' || type == 'datetime'
          ? new Date(value)
          : type === 'decimal' || type === 'integer'
          ? +value
          : value
      );
  };

  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilterChange &&
      onFilterChange(
        (type === 'date' || type == 'datetime') &&
          typeof filterKeyword === 'string'
          ? new Date(filterKeyword)
          : type === 'decimal' || type === 'integer'
          ? +filterKeyword
          : filterKeyword
      );
  };
  const handleClickFilter = (event: unknown) => {
    setOpenFilter(true);
  };

  const inputRef = useCallback(
    (inputElement: any) => {
      if (inputElement) {
        inputElement.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openFilter]
  );

  const inputComponent = {
    text: (
      <Form.Control
        autoFocus
        value={filterKeyword}
        onChange={handlerFilterChange}
        ref={inputRef}
      />
    ),
    decimal: (
      <Form.Control
        autoFocus
        type="number"
        value={filterKeyword}
        onChange={handlerFilterChange}
        ref={inputRef}
      />
    ),
    integer: (
      <Form.Control
        autoFocus
        type="number"
        value={filterKeyword}
        onChange={handlerFilterChange}
        ref={inputRef}
      />
    ),
    date: (
      <Form.Control
        autoFocus
        type="date"
        value={filterKeyword}
        onChange={handlerFilterChange}
        ref={inputRef}
      />
    ),
    datetime: (
      <Form.Control
        autoFocus
        type="datetime-local"
        value={filterKeyword}
        onChange={handlerFilterChange}
        ref={inputRef}
      />
    ),
    option: (
      <Form.Select.Native
        aria-label="select"
        autoFocus
        value={filterKeyword}
        onChange={handlerFilterChange as any}
      >
        <option key={-1} value={''}>
          {'All'}
        </option>
        {filterOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select.Native>
    ),
  };

  const handleClear = () => {
    setFilterKeyword('');
    filterOnChange && onFilterChange && onFilterChange('');
  };
  return (
    <>
      <Button
        color={color}
        className={classNames(classes['filter-button'], 'rounded-circle p-1')}
        onClick={handleClickFilter}
        size="sm"
      >
        <BsFunnel />
      </Button>
      <div
        style={{
          position: 'absolute',
          display: openFilter ? 'block' : 'none',
          zIndex: 1,
        }}
        ref={containerRef}
      >
        <Form onSubmit={handleFilter}>
          <InputGroup size="sm" aria-label="search-input">
            {inputComponent[type]}
            <InputGroup.Text>
              <Button
                type="submit"
                className={classNames(
                  classes['filter-button'],
                  'p-0 border-0 me-2'
                )}
              >
                <BsFunnel />
              </Button>
              <div className="vr" />
              <Button
                onClick={handleClear}
                className={classNames(
                  classes['filter-button'],
                  'p-0 border-0 ms-2'
                )}
              >
                <BsTrash2 className="text-danger" />
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form>
      </div>
    </>
  );
};
