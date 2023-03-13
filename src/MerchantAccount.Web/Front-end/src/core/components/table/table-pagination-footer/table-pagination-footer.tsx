import { useEffect } from 'react';
import Card from 'src/core/components/card/card';
import FormSelect from 'src/core/components/form-select/form-select';
import InputGroup from 'src/core/components/input-group/input-group';
import Pagination from 'src/core/components/pagination/pagination';

export interface TablePaginationFooterProps {
  onLimitChange?: (limit: string | number) => void;
  limits?: Array<string | number>;
  onPageChange?: (page: string | number) => void;
  page?: number;
  count?: number;
}

const TablePaginationFooter = ({
  onLimitChange,
  limits = [1, 2, 3],
  page,
  onPageChange,
  count,
}: TablePaginationFooterProps) => {
  useEffect(() => {
    onLimitChange && onLimitChange(limits[0]);
  }, []);
  return (
    <Card.Footer className="d-flex justify-content-end">
      <InputGroup aria-label="page-limit" size="sm" style={{ maxWidth: 'fit-content' }} className="d-inline-flex me-1">
        <FormSelect.Native
          style={{ maxWidth: 130 }}
          placeholder="1"
          onChange={(e) => (onLimitChange ? onLimitChange(e.target.value) : null)}
          size="sm"
        >
          {limits.map((limit: any) => (
            <FormSelect.Option key={limit} value={limit}>
              {limit}
            </FormSelect.Option>
          ))}
        </FormSelect.Native>
        <InputGroup.Text>/page</InputGroup.Text>
      </InputGroup>
      <Pagination
        aria-label="pagination"
        className="d-inline-flex m-0"
        page={page}
        onChange={onPageChange}
        count={count}
      />
    </Card.Footer>
  );
};

export default TablePaginationFooter;
